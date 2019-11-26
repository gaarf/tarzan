import React from "react";
import { useStyles, useGlobalStore, VIEW } from "../plumbing";
import { Splash, Welcome, Editor } from "./views";

const Views: React.FC = () => {
  const [view] = useGlobalStore(state => state.view);

  switch (view) {
    case VIEW.EDITOR:
      return <Editor />;
    case VIEW.WELCOME:
      return <Welcome />;
    default:
    case VIEW.SPLASH:
      return <Splash />;
  }
};

type LayoutProps = {
  dark?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ dark }) => {
  const [styles, cx] = useStyles(({ mixin, border, bg }) => ({
    container: {
      borderTop: border,
      ...mixin.newLayer,
      ...mixin.vertical,
      ...mixin.someChildWillScroll,
      backgroundColor: bg,
    },
  }));

  return (
    <div className={cx(styles.container, dark && 'bp3-dark')}>
      <Views />
    </div>
  );
};

export default Layout;
