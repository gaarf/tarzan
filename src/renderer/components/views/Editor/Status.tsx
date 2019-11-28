import React from "react";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { TreeSelection } from "./treeManager";

type StatusProps = {
  selected?: TreeSelection;
};

const SEPARATOR = ' > ';

const Status: React.FC<StatusProps> = ({selected}) => {
  const [styles, cx] = useStyles(({ unit, gray }) => {

    return {
      container: {
        padding: unit / 2,
        backgroundColor: gray
      },
    };
  });

  const [model] = useGlobalStore(state => state.model!);
  let { items } = model;
  const display = selected && selected.path.reduce<string[]>((memo, child) => {
    const item = items[child];
    items = item.items || [];
    return [...memo, item.label];
  }, []);


  return (
    <div className={cx(styles.container)}>
      {display ? display.join(SEPARATOR) : SEPARATOR}
    </div>
  );
};

export default Status;
