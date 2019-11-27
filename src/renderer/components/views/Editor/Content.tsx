import React from "react";
import { useStyles, useGlobalStore } from "../../../plumbing";

const Content: React.FC = () => {
  const [model] = useGlobalStore(state => state.model!);

  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    container: {
      padding: unit,
      ...mixin.flex,
      ...mixin.scroll,
    },
  }));

  const {items, ...rest} = model;

  return (
    <div className={cx(styles.container)}>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    </div>
  );
};

export default Content;
