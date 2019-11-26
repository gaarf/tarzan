import React from "react";
import { useStyles } from "../../../plumbing";

const Editor: React.FC = () => {
  const [styles, cx] = useStyles(({ mixin, border }) => {

    return {
      container: {
        ...mixin.flex,
        ...mixin.vertical,
        ...mixin.someChildWillScroll,
      },
      horizontal: {
        ...mixin.horizontal,
      },
      nav: {
        ...mixin.layerParent,
        ...mixin.someChildWillScroll,
        ...mixin.scroll,
        borderRight: border
      },
      footer: {
        borderTop: border
      }
    };
  });

  return (
    <div className={cx(styles.container)}>
      <div
        className={cx(styles.container, styles.horizontal)}
      >
        <nav className={cx(styles.nav)}>
          nav
        </nav>
        <main className={cx(styles.container)}>
          main
        </main>
      </div>
      <footer className={cx(styles.footer)}>
        footer
      </footer>
    </div>
  );
};

export { Editor };
export default Editor;
