import React, { useEffect } from "react";
import {
  Tree as BlueprintTree,
  TreeEventHandler as BlueprintTreeEventHandler
} from "@blueprintjs/core";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { useTreeManager, tarzanNodeFromTreePath, TreeSelection } from "./treeManager";
import { TarzanNode } from "../../../../main/types";

type TreeEventHandler = (node: TarzanNode, path: number[]) => void;
type TreeProps = {
  onNodeClick?: TreeEventHandler;
  onNodeContextMenu?: TreeEventHandler;
  selected?: TreeSelection;
};

const Tree: React.FC<TreeProps> = ({ onNodeClick, onNodeContextMenu, selected }) => {
  const [styles, cx] = useStyles(({ unit }) => {
    return {
      container: {
        padding: unit / 2,
        paddingTop: unit
      }
    };
  });

  const [items, treeManager, init] = useTreeManager(selected && selected.node);
  useEffect(init, []);

  const [model] = useGlobalStore(state => state.model);

  function mkHandler(fn?: TreeEventHandler): BlueprintTreeEventHandler {
    return (_, path) => {
      if (model) { fn && fn(tarzanNodeFromTreePath(model, path), path); }
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
