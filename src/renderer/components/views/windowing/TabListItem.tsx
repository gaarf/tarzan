import React from "react";
import { ContextMenuTarget, Menu, MenuItem } from "@blueprintjs/core";
import { withStyles, WithStylesProps } from "../../../plumbing/style";
import tabManager, { Tab } from "./tabManager";

type Props = {
  tab: Tab;
};

@ContextMenuTarget
class RightClickableTabItem extends React.Component<Props & WithStylesProps> {
  public render() {
    const { styles, cx, tab } = this.props;

    return (
      <li className={cx(styles.tab, tab.active && styles.tab_active)}>
        <button
          draggable
          className={cx(tab.active ? "active" : "inactive")}
          onDragStart={event => tabManager.drag.start(event, tab.id)}
          onDragEnd={event => tabManager.drag.end(event, tab.id)}
          onClick={() => tabManager.setActive(tab.id)}
        >
          {tab.label}
        </button>
      </li>
    );
  }

  public renderContextMenu() {
    const { id } = this.props.tab;

    return (
      <Menu>
        <MenuItem
          text="Close"
          icon="menu-closed"
          onClick={() => tabManager.removeTab(id)}
        />
      </Menu>
    );
  }

  public onContextMenuClose() {
    // Optional method called once the context menu is closed.
  }
}

export default withStyles(({ unit, bg, gray, border }) => ({
  tab: {
    borderLeft: border,
    borderBottom: border,
    "@selectors": {
      "> button": {
        border: "none",
        color: "currentColor",
        padding: unit,
        backgroundColor: bg
      },
      "> button.inactive:hover": {
        cursor: "pointer",
        boxShadow: `inset 0px 2px 3px 1px ${gray}`
      },
      "> button.dragging": {
        backgroundColor: gray
      }
    }
  },
  tab_active: {
    borderBottomColor: bg
  }
}))(RightClickableTabItem);
