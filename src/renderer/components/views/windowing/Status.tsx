import React from "react";
import { useStyles } from "../../../plumbing";
import { Code } from "@blueprintjs/core";
import Flex from "../../util/Flex";

const Status: React.FC = () => {
  const [styles, cx] = useStyles(({ gray }) => ({
    container: {
      backgroundColor: gray
    }
  }));

  return (
    <div className={cx(styles.container)}>
      <Flex padded justify="space-between">
        <Code>Status</Code>
      </Flex>
    </div>
  );
};

export default Status;
