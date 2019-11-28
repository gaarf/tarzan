import { useState, useEffect } from "react";
import { useGlobalStore } from "../../../plumbing";
import { ITreeNode } from "@blueprintjs/core";
import { TarzanTaxonomy, TarzanNode } from "../../../../main/types";

type SetterCallback = (items: ITreeNode[]) => void;

export class TreeManager {
  private callbacks: Array<SetterCallback> = [];
  public items: ITreeNode[] = [];

  public register(callback: SetterCallback) {
    this.callbacks.push(callback);
  }

  public deregister(callback: SetterCallback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  private broadcast() {
    const items = [...this.items];
    this.callbacks.forEach(callback => callback(items));
  }

  public walk(callback: (input: ITreeNode) => void) {
    function iterate(n: ITreeNode) {
      callback(n);
      if (n.childNodes) { n.childNodes.forEach(iterate); }
    }
    this.items.forEach(iterate);
  }

  public parse(model: TarzanTaxonomy, silent?: boolean) {
    console.log("parse");

    let id = 0;
    function convert(n: TarzanNode): ITreeNode {
      const { items } = n;
      return {
        id: n.id ? `n-${n.id}` : `i-${id++}`,
        label: n.label,
        icon: items ? "folder-close" : "tag",
        childNodes: items ? items.map(convert) : undefined
      };
    }
    this.items = model.items.map(convert);

    if (!silent) {
      this.broadcast();
    }
  }

  public update(model: TarzanTaxonomy, selectedNode?: TarzanNode) {
    console.log("update");

    const expandedIds: Array<string|number> = [];
    this.walk(n => n.isExpanded && expandedIds.push(n.id));
    this.parse(model, true);
    this.walk(n => n.isExpanded = expandedIds.includes(n.id));

    if (selectedNode) {
      const selectedId = `n-${selectedNode.id}`;
      this.walk(n => n.isSelected = n.id === selectedId);  
    }

    this.broadcast();
  }

  handleNodeToggle = (node: ITreeNode) => {
    toggleTreeNode(node);
    this.broadcast();
  };
}

export function toggleTreeNode(node: ITreeNode) {
  const { isExpanded, childNodes } = node;
  const hasChildren = childNodes && childNodes.length > 0;
  node.isExpanded = hasChildren && !isExpanded;
  node.icon = node.isExpanded ? "folder-open" : "folder-close";
}

export function tarzanNodeFromTreePath(
  model: TarzanTaxonomy | TarzanNode,
  path: number[]
): TarzanNode {
  if (!path.length || !model.items) return model as TarzanNode;
  const [index, ...rest] = path;
  return tarzanNodeFromTreePath(model.items[index], rest);
}

const treeManager = new TreeManager();

export function useTreeManager(selectedNode?:TarzanNode): [ITreeNode[], TreeManager, () => void] {
  const [items, setItems] = useState<ITreeNode[]>(treeManager.items);
  const [model] = useGlobalStore(state => state.model!);

  useEffect(() => {
    treeManager.register(setItems);
    return () => treeManager.deregister(setItems);
  }, []);

  useEffect(() => {
    treeManager.update(model, selectedNode);
  }, [model, selectedNode]);

  return [items, treeManager, () => treeManager.parse(model)];
}

export default treeManager;
