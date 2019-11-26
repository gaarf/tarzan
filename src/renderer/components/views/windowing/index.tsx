import React from "react";
import Split from "react-split";
import { useStyles } from "../../../plumbing";
import Tree from "./Tree";
import Sheet from "./Sheet";
import Status from "./Status";
import Toolbar from "./Toolbar";

const Windowing: React.FC = () => {
  const [styles, cx] = useStyles(({ mixin, border }) => {
    const container = {
      ...mixin.flex,
      ...mixin.vertical,
      ...mixin.someChildWillScroll,
    };

    return {
      container,
      horizontal: {
        ...mixin.horizontal,
        "@selectors": {
          "> nav": {
            ...mixin.layerParent,
            ...mixin.someChildWillScroll,
            ...mixin.scroll
          },
          "> nav::-webkit-scrollbar": {
            width: 0,
          },
          "> .gutter": {
            borderRight: border,
            backgroundColor: 'transparent',
            cursor: "col-resize",
          }
        }
      },
      vertical: {
        "@selectors": {
          "> section": {
            ...mixin.layerParent,
          },
          "> section:last-child": {
            marginBottom: 3
          },
          ">.gutter": {
            borderBottom: border,
            backgroundColor: 'transparent',
            cursor: "row-resize",
          }
        }
      },
      header: {
        borderBottom: border
      },
      footer: {
        borderTop: border
      }
    };
  });

  return (
    <div className={cx(styles.container)}>
      <header className={cx(styles.header)}>
        <Toolbar />
      </header>
      <Split
        className={cx(styles.container, styles.horizontal)}
        sizes={[25, 75]}
        gutterSize={5}
        direction="horizontal"
      >
        <nav>
          <Tree />
        </nav>
        <main className={cx(styles.container)}>
          <Split
            className={cx(styles.container, styles.vertical)}
            sizes={[50, 50]}
            gutterSize={5}
            direction="vertical"
          >
            <section>
              <Sheet name="above" />
            </section>
            <section>
              <Sheet name="below" />
            </section>
          </Split>
        </main>
      </Split>
      <footer className={cx(styles.footer)}>
        <Status />
      </footer>
    </div>
  );
};

export { Windowing };
export default Windowing;
