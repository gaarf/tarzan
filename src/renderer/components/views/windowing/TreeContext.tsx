import React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
import { TreeNode } from "./treeNodes";

type Props = {
  node: TreeNode;
};

const TreeContext:React.FC<Props> = ( { node }) => {
  console.log('TreeContext', node);
  return (
    <Menu>
      <MenuItem
        text="Something"
        icon="annotation"
      />
    </Menu>
  );
}

export default TreeContext;