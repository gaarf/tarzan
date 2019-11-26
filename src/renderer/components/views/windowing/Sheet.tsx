import React, { useEffect } from "react";
import { useStyles } from "../../../plumbing";
import TabListItem from "./TabListItem";
import { useTabManager, SheetName } from "./tabManager";
import { useTreeManager, nodeToTab } from "./treeManager";

type Props = {
  name: SheetName;
};

const Sheet: React.FC<Props> = ({ name }) => {
  const [tabs, tabManager] = useTabManager(name);
  const [, treeManager] = useTreeManager();

  useEffect(() => {
    if (name === "above") {
      tabManager.addTab(nodeToTab(treeManager.nodesByTabId.dump), name);
    }
  }, []);

  const [styles, cx] = useStyles(({ mixin, unit, bg, gray, border }) => ({
    container: {
      ...mixin.newLayer,
      ...mixin.vertical
    },
    tabs: {
      listStyleType: "none",
      margin: 0,
      padding: 0,
      ...mixin.scrollX,
      ...mixin.horizontal,
      "@selectors": {
        "> li:first-child": {
          borderLeft: "none"
        }
      }
    },
    target: {
      flexGrow: 1,
      minWidth: unit * 10,
      padding: unit,
      borderBottom: border,
      borderLeft: border,
      "@selectors": {
        ".dragover": {
          backgroundColor: gray
        }
      }
    },
    content: {
      ...mixin.layerParent,
      ...mixin.flex,
      ...mixin.scroll
    }
  }));

  return (
    <div className={cx(styles.container)}>
      <nav>
        <ul className={cx(styles.tabs)}>
          {tabs.map(tab => (
            <TabListItem key={tab.id} tab={tab} />
          ))}
          <li
            className={cx(styles.target)}
            onDragEnter={tabManager.drag.enter}
            onDragOver={tabManager.drag.over}
            onDragLeave={tabManager.drag.leave}
            onDrop={event => tabManager.drag.drop(event, name)}
          />
        </ul>
      </nav>
      <div className={cx(styles.content)}>
        {tabManager.elementForSheet(name)}
      </div>
    </div>
  );
};

export default Sheet;
