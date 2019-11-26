import React from "react";
import { useStyles, useGlobalStore, VIEW } from "../../plumbing";
import { Button } from "@blueprintjs/core";

const Welcome: React.FC = () => {
  const [styles, cx] = useStyles(({ unit }) => ({
    container: {
      padding: unit,
      overflow: "auto"
    }
  }));

  const [, dispatch] = useGlobalStore();

  const handleWindowing = () => {
    dispatch("GOTO_VIEW", VIEW.WINDOWING);
  };

  return (
    <div className={cx(styles.container)}>
      <h2 className="bp3-heading">Welcome!</h2>

      <Button onClick={handleWindowing}>GOTO Windowing</Button>
    </div>
  );
};

export { Welcome };
export default Welcome;
