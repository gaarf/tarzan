import React from "react";
import { ITreeNode } from "@blueprintjs/core";
import { TabId } from "./tabManager";
import Lipsum from "../../util/Lipsum";
import Clock from "../../util/Clock";
import { SettingSheet, DumpSheet } from "../../sheets";

export type TreeNode = ITreeNode<{
  tabId?: TabId;
  tabLabel?: string;
  treeContext?: boolean;
  Component?: React.ComponentType;
  props?: object | (() => object);
}>;

export enum NodeId {
  ROOT = 'root',
}

let i = Object.values(NodeId).length;

const nodes: Array<TreeNode> = [
  {
    id: NodeId.ROOT,
    icon: "slash",
    isExpanded: true,
    label: "Root",
    childNodes: [
      {
        id: i++,
        icon: "code",
        label: "Dump",
        nodeData: {
          Component: DumpSheet
        }
      },
    ]
  },
  {
    id: i++,
    icon: "folder-close",
    isExpanded: false,
    label: "Toys",
    childNodes: [
      {
        id: i++,
        icon: "new-text-box",
        label: "Lorem Ipsum Dolor",
        nodeData: {
          Component: Lipsum,
          props: () => ({
            count: Math.floor(Math.random() * 10)
          })
        }
      },
      {
        id: i++,
        icon: "time",
        label: "Clock",
        nodeData: {
          Component: Clock
        }
      },
      {
        id: i++,
        icon: "style",
        label: "Settings",
        nodeData: {
          Component: SettingSheet
        }
      }
    ]
  }
];

export default nodes;
