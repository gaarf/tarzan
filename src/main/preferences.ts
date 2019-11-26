import ElectronStore from "electron-store";
import { ipcMain } from "electron";
import { THEME, State } from "../renderer/plumbing/constants";
import { Preferences } from "./types";
import { rendererDispatch } from "./utils";

const prefs = new ElectronStore<Preferences>({
  name: "prefs",
  defaults: {
    theme: THEME.LIGHT,
  }
});

prefs.onDidAnyChange(a => rendererDispatch("SET_PREFS", a));

const stateUpdater = (e:Event, { prefs: { theme } }:State) => {
  prefs.set("theme", theme);
};

ipcMain.on("app-init", () => {
  rendererDispatch("SET_PREFS", prefs.store);
  ipcMain.on("state-update", stateUpdater);  
});

ipcMain.on("app-unload", () => {
  ipcMain.removeListener("state-update", stateUpdater);  
});

export { prefs };
export default prefs;
