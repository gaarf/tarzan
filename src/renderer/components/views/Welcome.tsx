import React from "react";
import { ipcRenderer } from "electron";
import { useStyles } from "../../plumbing";
import { Button, ButtonGroup } from "@blueprintjs/core";

const Welcome: React.FC = () => {
  const [styles, cx] = useStyles(({ unit }) => ({
    container: {
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
      <h2 className="bp3-heading">Welcome!</h2>

      <ButtonGroup>
        <Button onClick={handleNewModel}>New Model</Button>
        <Button onClick={handleOpenModel}>Open YAML</Button>
      </ButtonGroup>
    </div>
  );
};

export { Welcome };
export default Welcome;
