import React, { useEffect } from "react";
import {
  Tree as BlueprintTree,
  TreeEventHandler as BlueprintTreeEventHandler
} from "@blueprintjs/core";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { useTreeManager, tarzanNodeFromTreePath } from "./treeManager";
import { TarzanNode } from "../../../../main/types";

type TarzanTreeEventHandler = (node: TarzanNode, path: number[]) => void;
type TreeProps = {
  onNodeClick?: TarzanTreeEventHandler;
  onNodeContextMenu?: TarzanTreeEventHandler;
  selectedNode?: TarzanNode;
};

const Tree: React.FC<TreeProps> = ({ onNodeClick, onNodeContextMenu, selectedNode }) => {
  const [styles, cx] = useStyles(({ unit }) => {
    return {
      container: {
        padding: unit / 2,
        paddingTop: unit
      }
    };
  });

  const [items, treeManager, init] = useTreeManager(selectedNode);
  useEffect(init, []);

  const [model] = useGlobalStore(state => state.model);

  function mkHandler(fn?: TarzanTreeEventHandler): BlueprintTreeEventHandler {
    return (_, path) => {
      if (model) {
        const node = tarzanNodeFromTreePath(model, path);
        fn && fn(node, path);
      }
    };
  }
  const handleNodeClick = mkHandler(onNodeClick);
  const handleNodeContextMenu = mkHandler(onNodeContextMenu);
  const { handleNodeToggle } = treeManager;

  return (
    <div className={cx(styles.container)}>
      <BlueprintTree
        contents={items}
        onNodeClick={handleNodeClick}
        onNodeContextMenu={handleNodeContextMenu}
        onNodeCollapse={handleNodeToggle}
        onNodeExpand={handleNodeToggle}
      />
    </div>
  );
};

export default Tree;
