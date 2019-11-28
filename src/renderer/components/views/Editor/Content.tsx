import React from "react";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { TreeSelection } from "./treeManager";

type ContentProps = {
  selected?: TreeSelection;
};

const Content: React.FC<ContentProps> = ({ selected }) => {
  const [model] = useGlobalStore(state => state.model!);

  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    container: {
      padding: unit,
      ...mixin.scroll,
      "@selectors": {
        "> textarea" : {
          resize: 'none',
          height: '100%',
          width: '100%'
        }
      }
    },
  }));

  const {items, ...rest} = selected ? selected.node : model;

  return (
    <div className={cx(styles.container)}>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    </div>
  );
};

export default Content;
