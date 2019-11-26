import React from "react";
import { useGlobalStore } from "../../plumbing";
import { Pre } from "@blueprintjs/core";
import Flex from "../util/Flex";

const Dump: React.FC = () => {
  const [state] = useGlobalStore(state => state);
 
  return (
    <Flex padded>
      <Pre>{JSON.stringify(state, null, 2)}</Pre>
    </Flex>

  );
};

export default Dump;
