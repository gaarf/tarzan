import React from "react";
import { useStyles, useGlobalStore } from "../../../plumbing";
import { TreeSelection } from "./treeManager";
import { Breadcrumbs, IBreadcrumbProps } from "@blueprintjs/core";

type StatusProps = {
  selected?: TreeSelection;
};

const Status: React.FC<StatusProps> = ({ selected }) => {
  const [styles, cx] = useStyles(({ unit, gray }) => {
    return {
      container: {
        padding: unit / 2,
        backgroundColor: gray
      }
    };
  });

  const [model] = useGlobalStore(state => state.model!);
  let { items } = model;
  const crumbs: IBreadcrumbProps[] = (selected ? selected.path : []).reduce<
    IBreadcrumbProps[]
  >((memo, child) => {
    const item = items[child];
    items = item.items || [];
    return [
      ...memo,
      {
        text: item.label
      }
    ];
  }, []);

  return (
    <div className={cx(styles.container)}>
      <Breadcrumbs items={crumbs} />
    </div>
  );
};

export default Status;
