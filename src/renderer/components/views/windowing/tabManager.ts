import React, { useEffect, useState, DragEvent } from "react";

export type TabId = string;
export type SheetName = string;
export type Tab = {
  id: TabId;
  label: string;
  element: React.ReactNode;
  active?: boolean;
};
type Tabs = Array<Tab>;
type SetterCallback = (tabs: Tabs) => void;
type Sheet = {
  tabs: Tabs;
  activeId?: TabId;
  callbacks: Array<SetterCallback>;
};

const DRAGOVER = 'dragover';
const DRAGGING = 'dragging';

class DragHandlers {
  constructor(private tabManager: TabManager) {}

  public start({dataTransfer, currentTarget}:DragEvent, id: TabId) {
    dataTransfer.setData('text/plain', id);
    dataTransfer.effectAllowed = "move";
    currentTarget.classList.add(DRAGGING);
  }

  public enter({currentTarget}:DragEvent) {
    currentTarget.classList.add(DRAGOVER);
  }

  public over(event:DragEvent) {
    event.preventDefault();
  }

  public leave({currentTarget}:DragEvent) {
    currentTarget.classList.remove(DRAGOVER);
  }

  public drop({dataTransfer, currentTarget}:DragEvent, key: SheetName) {
    currentTarget.classList.remove(DRAGOVER);
    this.tabManager.moveTab(dataTransfer.getData('text/plain'), key);
  }

  public end({currentTarget}:DragEvent, id: TabId) {
    currentTarget.classList.remove(DRAGGING);
  }
}

export class TabManager {
  private sheets: Map<SheetName, Sheet> = new Map();
  public drag = new DragHandlers(this);

  public register(key: SheetName, callback: SetterCallback) {
    if (!key) {
      return;
    }
    if (!this.sheets.has(key)) {
      console.log("register", key, this);
      this.sheets.set(key, {
        tabs: [],
        callbacks: []
      });
    }
    if (callback) {
      this.sheets.get(key)!.callbacks.push(callback);
    }
  }

  public deregister(key: SheetName, callback: SetterCallback) {
    const sheet = this.sheets.get(key);
    if (sheet) {
      sheet.callbacks = sheet.callbacks.filter(cb => cb !== callback);
      if (sheet.callbacks.length === 0) {
        this.sheets.delete(key);
      }
    }
  }

  private broadcast(key: SheetName) {
    const { callbacks } = this.sheets.get(key)!;
    const tabs = this.tabsIn(key);
    callbacks.forEach(callback => callback(tabs));
  }

  public tabsIn(key: SheetName): Tab[] {
    const { tabs, activeId } = this.sheets.get(key) || {};
    const out = (tabs || []).map(tab => ({
      ...tab,
      active: tab.id === activeId
    }));
    return out;
  }

  get firstSheet(): SheetName {
    return this.sheets.keys().next().value;
  }

  get tabIds(): Array<TabId> {
    return Array.from(this.sheets.values())
      .flatMap(one => one.tabs.map(tab => tab.id));
  }

  public activeTabId(key: SheetName) {
    const { activeId } = this.sheets.get(key) || {};
    return activeId;
  }

  public setActive(id: TabId) {
    const key = this.sheetThatHas(id);
    if (key) {
      const sheet = this.sheets.get(key)!;
      sheet.activeId = id;
      this.broadcast(key);
    }
  }

  public elementForSheet(key: SheetName) {
    const id = this.activeTabId(key);
    if (id) {
      const tab = this.tabsIn(key).find(one => one.id === id);
      if (tab) {
        return tab.element;
      }
    }
    return null;
  }

  private sheetThatHas(id: TabId) {
    return Array.from(this.sheets.keys()).find(key =>
      this.tabsIn(key).find(tab => tab.id === id)
    );
  }

  public removeTabs(rx: RegExp) {
    this.tabIds.forEach(one => {
      if (rx.test(one)) {
        this.removeTab(one);
      }
    });
  }

  public removeTab(id: TabId) {
    const from = this.sheetThatHas(id);
    if (!from) {
      return [];
    }
    const sheet = this.sheets.get(from)!;
    const { tabs } = sheet;
    const out = tabs.splice(tabs.findIndex(tab => tab.id === id), 1);
    if (out[0].id === sheet.activeId) {
      const last = tabs[tabs.length-1];
      sheet.activeId = last && last.id;
    }
    this.broadcast(from);
    return out;
  }

  public addTab(tab: Tab, toKey?: SheetName) {
    const key = toKey || this.firstSheet;
    const sheet = this.sheets.get(key);
    if (sheet) {
      const id = tab.id;
      const hadBy = this.sheetThatHas(id);
      if (hadBy) {
        this.sheets.get(hadBy)!.activeId = id;
        this.broadcast(hadBy);
      }
      else {
        sheet.tabs.push({ ...tab, id });
        sheet.activeId = id;
        this.broadcast(key);
      }
    }
  }

  public moveTab(id: string, toKey: SheetName) {
    const [tab] = this.removeTab(id);
    if (tab) {
      this.addTab(tab, toKey);
    }
  }
}

const tabManager = new TabManager();

export function useTabManager(name: SheetName): [Array<Tab>, TabManager] {
  const [tabs, setTabs] = useState(tabManager.tabsIn(name));

  useEffect(() => {
    tabManager.register(name, setTabs);
    return () => tabManager.deregister(name, setTabs);
  }, [name]);

  return [tabs, tabManager];
}

export default tabManager;
