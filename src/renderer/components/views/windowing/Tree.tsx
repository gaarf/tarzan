import React from "react";
import { Tree as BlueprintTree } from "@blueprintjs/core";
import { useTreeManager }  from "./treeManager";

const Tree: React.FC = () => {
  const [items, treeManager] = useTreeManager();

  return (
    <BlueprintTree
      contents={items}
      onNodeClick={treeManager.handleNodeClick}
      onNodeContextMenu={treeManager.handleNodeContextMenu}
      onNodeCollapse={treeManager.handleNodeToggle}
      onNodeExpand={treeManager.handleNodeToggle}
    />
  );
};

export default Tree;
