import React, { useEffect, useState } from "react";
import { ContextMenu } from "@blueprintjs/core";
import tabManager, { Tab } from "./tabManager";
import nodes, { TreeNode } from "./treeNodes";
import TreeContext from "./TreeContext";

type SetterCallback = (items: TreeNode[]) => void;
type NodesById = { [k: string]: TreeNode };

export class TreeManager {
  private callbacks: Array<SetterCallback> = [];
  public items: TreeNode[] = nodes;

  get nodesById() {
    function walk(a: TreeNode[], prev: NodesById = {}): NodesById {
      return a.reduce((acc, one) => {
        acc[String(one.id)] = one;
        return one.childNodes ? walk(one.childNodes, acc) : acc;
      }, prev);
    }
    return walk(this.items);
  }

  get nodesByTabId() {
    function walk(a: TreeNode[], prev: NodesById = {}): NodesById {
      return a.reduce((acc, one) => {
        const { nodeData } = one;
        if (nodeData && nodeData.tabId) {
          acc[nodeData.tabId] = one;
        }
        return one.childNodes ? walk(one.childNodes, acc) : acc;
      }, prev);
    }
    return walk(this.items);
  }

  public update(callback: (old: TreeNode) => TreeNode) {
    function walk(a: TreeNode[]): TreeNode[] {
      return a
        .map(callback)
        .map(node =>
          node.childNodes
            ? { ...node, childNodes: walk(node.childNodes) }
            : node
        );
    }
    this.items = walk(this.items);
    this.broadcast();
  }

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

  handleNodeToggle = (node: TreeNode) => {
    const { isExpanded, childNodes } = node;
    const hasChildren = childNodes && childNodes.length > 0;
    node.isExpanded = hasChildren && !isExpanded;
    node.icon = node.isExpanded ? "folder-open" : "folder-close";
    this.broadcast();
  };

  handleNodeContextMenu = (
    node: TreeNode,
    path: number[],
    e: React.MouseEvent
  ) => {
    const { nodeData } = node;
    if (nodeData && nodeData.treeContext) {
      ContextMenu.show(React.createElement(TreeContext, { node }), {
        left: e.clientX,
        top: e.clientY
      });
    }
  };

  handleNodeClick = (node: TreeNode) => {
    const { nodeData } = node;
    if (nodeData && nodeData.Component) {
      tabManager.addTab(nodeToTab(node));
    }
  };
}

const treeManager = new TreeManager();

export function nodeToTab(node: TreeNode): Tab {
  const { tabId, tabLabel, Component, props } = node.nodeData!;
  const id = tabId || Date.now().toString();
  return {
    id,
    element: React.createElement(
      Component!,
      typeof props === "function" ? props() : props
    ),
    label: tabLabel || String(node.label)
  };
}


export function useTreeManager(): [TreeNode[], TreeManager] {
  const [items, setItems] = useState<TreeNode[]>(treeManager.items);

  useEffect(() => {
    treeManager.register(setItems);
    return () => treeManager.deregister(setItems);
  }, []);

  return [items, treeManager];
}

export default treeManager;
