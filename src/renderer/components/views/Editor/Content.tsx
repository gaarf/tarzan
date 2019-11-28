import React from "react";
import { useStyles } from "../../../plumbing";
import { TreeSelection } from "./treeManager";

type ContentProps = {
  selected?: TreeSelection;
};

const blank = { data: {}, items: [] };

const Content: React.FC<ContentProps> = ({ selected }) => {
  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    container: {
      padding: unit,
      ...mixin.flex,
      ...mixin.scroll,
    },
  }));

  const {items, data, ...rest} = selected ? selected.node : blank;

  return (
    <div className={cx(styles.container)}>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    </div>
  );
};

export default Content;
