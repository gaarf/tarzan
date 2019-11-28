import React, { useState } from "react";
import Split from "react-split";
import { useStyles } from "../../../plumbing";
import Content from "./Content";
import Tree from "./Tree";
import Status from "./Status";
import { TarzanNode } from "../../../../main/types";

const Editor: React.FC = () => {
  const [styles, cx] = useStyles(({ mixin, border, gray }) => {
    return {
      container: {
        ...mixin.flex,
        ...mixin.vertical,
        ...mixin.someChildWillScroll
      },
      horizontal: {
        ...mixin.horizontal,
        "@selectors": {
          "> .gutter": {
            boxSizing: "content-box",
            borderRight: border,
            borderLeft: border,
            backgroundColor: gray,
            cursor: "col-resize"
          }
        }
      },
      nav: {
        ...mixin.layerParent,
        ...mixin.scroll
      },
      footer: {
        borderTop: border
      }
    };
  });

  const [selectedNode, setSelectedNode] = useState<TarzanNode>();

  return (
    <div className={cx(styles.container)}>
      <Split
        sizes={[25, 75]}
        gutterSize={1}
        direction="horizontal"
        className={cx(styles.container, styles.horizontal)}
      >
        <nav className={cx(styles.nav)}>
          <Tree onNodeClick={setSelectedNode} selectedNode={selectedNode} />
        </nav>
        <main className={cx(styles.container)}>
          <Content selectedNode={selectedNode} />
        </main>
      </Split>
      <footer className={cx(styles.footer)}>
        <Status selectedNode={selectedNode} />
      </footer>
    </div>
  );
};

export { Editor };
export default Editor;
