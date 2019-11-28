import React, { useState } from "react";
import Split from "react-split";
import { useStyles } from "../../../plumbing";
import Content from "./Content";
import Tree from "./Tree";
import Status from "./Status";
import { TreeSelection } from "./treeManager";

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

  const [selected, setSelected] = useState<TreeSelection>();

  return (
    <div className={cx(styles.container)}>
      <Split
        sizes={[25, 75]}
        gutterSize={1}
        direction="horizontal"
        className={cx(styles.container, styles.horizontal)}
      >
        <nav className={cx(styles.nav)}>
          <Tree
            onNodeClick={(node, path) => setSelected({ node, path })}
            selected={selected}
          />
        </nav>
        <main className={cx(styles.container)}>
          <Content selected={selected} />
        </main>
      </Split>
      <footer className={cx(styles.footer)}>
        <Status selected={selected} />
      </footer>
    </div>
  );
};

export { Editor };
export default Editor;
