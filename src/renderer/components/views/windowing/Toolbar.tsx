import React from "react";
import { ipcRenderer } from "electron";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { Button, EditableText } from "@blueprintjs/core";
import Flex from "../../util/Flex";

const Toolbar: React.FC = () => {
  const [styles, cx] = useStyles(({ unit }) => ({
    container: {
      padding: unit
    },
    title: {
      fontStyle: "italic"
    }
  }));

  const handleClick = () => {
    ipcRenderer.send("model-api", "solve");
  };

  const [{ system }, dispatch] = useGlobalStore(state => state.model!);

  const handleNameChange = (name: string) => {
    dispatch("EDIT_SYSTEM", {
      meta: {
        ...system.meta,
        name
      }
    });
  };

  const { name } = system.meta;

  return (
    <div className={cx(styles.container)}>
      <Flex justify="space-between">
        <div className={cx(styles.title)}>
          <EditableText
            placeholder="Model name"
            defaultValue={name}
            key={name}
            onConfirm={handleNameChange}
          />
        </div>
        <Button intent="primary" icon="numerical" onClick={handleClick} disabled={system.equations.length===0}>
          Solve
        </Button>
      </Flex>
    </div>
  );
};

export default Toolbar;
