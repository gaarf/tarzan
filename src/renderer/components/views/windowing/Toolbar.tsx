import React from "react";
import { useStyles } from "../../../plumbing";
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


  return (
    <div className={cx(styles.container)}>
      <Flex justify="space-between">
        Toolbar
      </Flex>
    </div>
  );
};

export default Toolbar;
