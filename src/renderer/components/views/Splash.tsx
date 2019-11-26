import React from "react";
import { Callout, ProgressBar } from "@blueprintjs/core";
import { useStyles, usePromise, useGlobalStore, delay, VIEW } from "../../plumbing";

const Splash: React.FC = () => {
  const [styles, cx] = useStyles(({ unit, mixin }) => ({
    welcome: {
      ...mixin.newLayer,
      padding: `0 ${unit * 5}px`,
      ...mixin.vertical,
      ...mixin.centerCenter
    }
  }));

  const [, dispatch] = useGlobalStore();
  const [, error] = usePromise(
    () => delay(666),
    () => dispatch("GOTO_VIEW", VIEW.WELCOME),
  );

  return (
    <div className={cx(styles.welcome)}>
      {error ? <Callout>{error.message}</Callout> : (
        <>
          <h1 className="bp3-heading">Tarzan</h1>
          <ProgressBar />
        </>
      )}
    </div>
  );
};

export { Splash };
export default Splash;
