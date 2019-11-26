import React from "react";
import { useStyles, useGlobalStore, plural } from "../../../plumbing";
import { Tag, Spinner, Code } from "@blueprintjs/core";
import Flex from "../../util/Flex";

const Status: React.FC = () => {
  const [styles, cx] = useStyles(({ gray }) => ({
    container: {
      backgroundColor: gray
    }
  }));

  const [requestCount] = useGlobalStore(state => state.requests.length);
  const loading = requestCount > 0;

  const [apiUrl] = useGlobalStore(state => state.prefs.api);

  return (
    <div className={cx(styles.container)}>
      <Flex padded justify="space-between">
        <Flex>
          <Tag
            round
            intent={loading ? "warning" : "none"}
            title={plural(requestCount, 'active request')}
          >
            {requestCount}
          </Tag>
          {loading && <Spinner size={Spinner.SIZE_SMALL} />}
        </Flex>
        <Code>{apiUrl}</Code>
      </Flex>
    </div>
  );
};

export default Status;
