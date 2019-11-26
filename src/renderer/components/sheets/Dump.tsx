import React from "react";
import { useGlobalStore } from "../../plumbing";
import { Pre } from "@blueprintjs/core";
import Flex from "../util/Flex";

const Dump: React.FC = () => {
  const [model] = useGlobalStore(state => state.model!);
 
  return (
    <Flex padded>
      <Pre>{JSON.stringify(model, null, 2)}</Pre>
    </Flex>

  );
};

export default Dump;
