import React, { useState, useEffect } from "react";
import { ProgressBar } from "@blueprintjs/core";
import Center from "./Center";

const Clock: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    console.log("mounting Clock");

    const interval = setInterval(() => {
      setValue(v => (v >= 1 ? 0 : v + 0.01));
    }, 1000);

    return () => {
      console.log("unmounting Clock");
      clearInterval(interval);
    };
  }, []);

  return (
    <Center><ProgressBar intent="primary" value={value} /></Center>
  );
};

export default Clock;
