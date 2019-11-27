import React from "react";
import { useStyles } from "../../../plumbing";

const Status: React.FC = () => {
  const [styles, cx] = useStyles(({ mixin, unit, gray }) => {

    return {
      container: {
        padding: unit / 2,
        backgroundColor: gray
      },
    };
  });

  return (
    <div className={cx(styles.container)}>
      Hello
    </div>
  );
};

export default Status;
