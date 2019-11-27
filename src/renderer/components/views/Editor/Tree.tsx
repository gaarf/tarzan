import React, { useEffect } from "react";
import { Tree as BlueprintTree } from "@blueprintjs/core";
import { useStyles } from "../../../plumbing";
import { useTreeManager } from "./treeManager";

const Tree: React.FC = () => {
  const [styles, cx] = useStyles(({ unit }) => {
    return {
      container: {
        padding: unit / 2,
        paddingTop: unit
      }
    };
  });

  const [items, treeManager, init] = useTreeManager();
  useEffect(init, []);

  return (
    <div className={cx(styles.container)}>
      <BlueprintTree
        contents={items}
        onNodeClick={treeManager.handleNodeClick}
        onNodeContextMenu={treeManager.handleNodeContextMenu}
        onNodeCollapse={treeManager.handleNodeToggle}
        onNodeExpand={treeManager.handleNodeToggle}
      />
    </div>
  );
};

export default Tree;
