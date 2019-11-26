import React from "react";
import { useStyles } from "../../plumbing";

const Center: React.FC = ({ children }) => {
  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    outer: {
      ...mixin.newLayer,
      ...mixin.horizontal,
      ...mixin.center,
    },
    inner: {
      margin: unit,
      ...mixin.flex,
    },
  }));

  return (
    <div className={cx(styles.outer)}>
      <div className={cx(styles.inner)}>
        {children}
      </div>
    </div>
  );
};

export default Center;
