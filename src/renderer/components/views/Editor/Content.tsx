import React from "react";
import { useStyles } from "../../../plumbing";
import { TreeSelection } from "./treeManager";
import { NonIdealState, H2, Blockquote, Pre, Tag } from "@blueprintjs/core";

type ContentProps = {
  selected?: TreeSelection;
};

const Content: React.FC<ContentProps> = ({ selected }) => {
  const [styles, cx] = useStyles(({ mixin, unit }) => ({
    container: {
      padding: unit,
      ...mixin.flex,
      ...mixin.scroll
    },
    tag: {
      marginRight: unit,
      verticalAlign: "text-bottom"
    }
  }));

  if (!selected) {
    return (
      <NonIdealState title="Please select a node" icon="add-column-left" />
    );
  }

  const { items, data, label, description, id, ...rest } = selected.node;
  const showData = data && Object.values(data).find(o => !!o);

  return (
    <div className={cx(styles.container)}>
      <H2>
        {id && (
          <Tag round large className={cx(styles.tag)}>
            {id}
          </Tag>
        )}
        <span>{label}</span>
      </H2>
      <Blockquote>{description}</Blockquote>
      <Pre>{JSON.stringify(rest, null, 2)}</Pre>
      {showData && (
        <Pre>{JSON.stringify(data, null, 2)}</Pre>
      )}
    </div>
  );
};

export default Content;
