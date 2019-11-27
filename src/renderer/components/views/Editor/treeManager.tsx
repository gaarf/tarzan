import React, { useState, useEffect } from "react";
import { useGlobalStore } from "../../../plumbing";
import { ITreeNode } from "@blueprintjs/core";
import { TarzanTaxonomy } from "../../../../main/types";

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: ITreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "folder-close",
    label: "Folder 0"
  },
  {
    id: 1,
    icon: "folder-close",
    isExpanded: true,
    label: "Whatever",
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0",
      },
      {
        id: 3,
        label:
          "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man."
      },
      {
        id: 4,
        hasCaret: true,
        icon: "folder-close",
        label: "More things",
        childNodes: [
          { id: 5, label: "No-Icon Item" },
          { id: 6, icon: "tag", label: "Item 1" },
          {
            id: 7,
            hasCaret: true,
            icon: "folder-close",
            label: "Folder 3",
            childNodes: [
              { id: 8, icon: "document", label: "Item 0" },
              { id: 9, icon: "tag", label: "Item 1" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    hasCaret: true,
    icon: "folder-close",
    label: "Super secret files",
    disabled: true
  }
];
/* tslint:enable:object-literal-sort-keys */

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

  public init(model: TarzanTaxonomy) {
    console.log('init');
    this.items = INITIAL_STATE;
    this.broadcast();
  }

  public update(model: TarzanTaxonomy) {
    console.log('update');
    // TODO
    this.broadcast();
  }

  handleNodeToggle = (node: ITreeNode) => {
    const { isExpanded, childNodes } = node;
    const hasChildren = childNodes && childNodes.length > 0;
    node.isExpanded = hasChildren && !isExpanded;
    node.icon = node.isExpanded ? "folder-open" : "folder-close";
    this.broadcast();
  };

  handleNodeContextMenu = (
    node: ITreeNode,
    path: number[],
    e: React.MouseEvent
  ) => {
    console.log('handleNodeContextMenu', node, path, e);
  };

  handleNodeClick = (node: ITreeNode) => {
    console.log('handleNodeClick', node);
  };
}

const treeManager = new TreeManager();

export function useTreeManager(): [ITreeNode[], TreeManager, () => void] {
  const [items, setItems] = useState<ITreeNode[]>(treeManager.items);
  const [model] = useGlobalStore(state => state.model!);

  useEffect(() => {
    treeManager.register(setItems);
    return () => treeManager.deregister(setItems);
  }, []);

  useEffect(() => {
    treeManager.update(model);
  }, [model]);

  return [items, treeManager, () => treeManager.init(model)];
}

export default treeManager;
