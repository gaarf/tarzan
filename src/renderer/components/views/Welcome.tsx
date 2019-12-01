import React from "react";
import { ipcRenderer } from "electron";
import { useStyles } from "../../plumbing";
import { Button, ButtonGroup } from "@blueprintjs/core";

const Welcome: React.FC = () => {
  const [styles, cx] = useStyles(({ unit, mixin }) => ({
    container: {
      ...mixin.newLayer,
      ...mixin.vertical,
      ...mixin.centerCenter,
      padding: unit,
      overflow: "auto"
    }
  }));

  const handleNewModel = () => {
    ipcRenderer.send("model-new");
  };

  const handleOpenModel = () => {
    ipcRenderer.send("model-load");
  };

  return (
    <div className={cx(styles.container)}>
      <h3 className="bp3-heading">Welcome to the Jungle!</h3>

      <ButtonGroup>
        <Button disabled onClick={handleNewModel}>New Tree</Button>
        <Button onClick={handleOpenModel}>Open JSON</Button>
      </ButtonGroup>
    </div>
  );
};

export { Welcome };
export default Welcome;
