import React, { useEffect, useState } from "react";
import path from "path";
import { Button, ContextMenu } from "@blueprintjs/core";
import tabManager, { Tab } from "./tabManager";
import nodes, { TreeNode, NodeId } from "./treeNodes";
import { useGlobalStore, dispatch } from "../../../plumbing";
import { IMiloModel } from "../../../../main/types";
import TreeContext from "./TreeContext";
import { SpreadSheet } from "../../sheets";

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

function mkModelUpdater(model: IMiloModel) {
  const { data, system } = model;

  return function(node: TreeNode) {
    const { isExpanded } = node;
    let out: TreeNode;

    switch (node.id) {
      case NodeId.VARIABLES:
        {
          const keys = Object.keys(system.variable);
          out = {
            ...node,
            childNodes:
              keys.length === 0
                ? undefined
                : keys.map(
                    (one): TreeNode => ({
                      id: `variable#${one}`,
                      label: one,
                      secondaryLabel: React.createElement(Button, {
                        small: true,
                        icon: "remove",
                        onClick: (event: React.MouseEvent) => {
                          event.stopPropagation();
                          const { [one]: _, ...variable } = system.variable;
                          dispatch("EDIT_SYSTEM", { variable });
                        }
                      })
                    })
                  )
          };
        }
        break;

      case NodeId.DATA:
        out = {
          ...node,
          childNodes:
            data.length === 0
              ? undefined
              : data.map(
                  (one, index): TreeNode => {
                    const id = `${NodeId.DATA}#${index}`;
                    return {
                      id,
                      icon: "document",
                      label: path.basename(one.path) || "[pathless]",
                      nodeData: {
                        tabId: `${id}#${Date.now()}`,
                        Component: SpreadSheet,
                        props: { index }
                      },
                      secondaryLabel: React.createElement(Button, {
                        small: true,
                        icon: "remove",
                        onClick: (event: React.MouseEvent) => {
                          event.stopPropagation();
                          tabManager.removeTabs(new RegExp(`^${NodeId.DATA}#\\d+$`));
                          dispatch("REMOVE_DATA", one);
                        }
                      })
                    };
                  }
                )
        };
        break;

      default:
        return node;
    }

    if (out.childNodes ? !isExpanded : isExpanded) {
      treeManager.handleNodeToggle(out);
    }

    return out;
  };
}

export function useTreeManager(): [TreeNode[], TreeManager] {
  const [items, setItems] = useState<TreeNode[]>(treeManager.items);
  const [model] = useGlobalStore(state => state.model!);

  useEffect(() => {
    treeManager.update(mkModelUpdater(model));
  }, [model]);

  useEffect(() => {
    treeManager.register(setItems);
    return () => treeManager.deregister(setItems);
  }, []);

  return [items, treeManager];
}

export default treeManager;
