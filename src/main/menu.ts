import { Menu, dialog } from "electron";
import { is, appMenu, debugInfo } from "electron-util";
import { ipcMain } from "electron";
import { prefs } from "./preferences";
import { State, THEME, VIEW } from "../renderer/plumbing/constants";
const { DARK, LIGHT } = THEME;

const prefsItem = [
  {
    label: "Preferences…",
    accelerator: "Command+,",
    click: () => prefs.openInEditor()
  }
];

const template = [
  is.macos ? appMenu(prefsItem) : null,
  {
    role: "fileMenu",
    submenu: [  
      {
        id: 'open',
        enabled: false,
        label: "Open…",
        accelerator: "Command+O",
        click: () => ipcMain.emit('model-load')
      },
      {
        id: 'save',
        enabled: false,
        label: "Save…",
        accelerator: "Command+S",
        click: () => ipcMain.emit('model-save')
      },
      ...(is.macos ? [] : [{ type: "separator" }, { role: "quit" }])
    ]
  },
  {
    label: "View",
    submenu: [
      ...(is.macos ? [] : prefsItem),
      {
        id: "theme",
        type: "checkbox",
        checked: true,
        label: "Dark Theme",
        click: () => {
          prefs.set('theme', itemByID.theme.checked ? DARK : LIGHT);
        }
      },
      { type: "separator" },
      { role: "forcereload" },
      { role: "toggledevtools" }
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "About Tarzan",
        click: () => {
          dialog.showMessageBox({
            buttons: ["Close"],
            title: "About",
            message: debugInfo()
          });
        }
      }
    ]
  }
].filter(item => item);

// @ts-ignore
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

const itemByID = ['theme','open','save'].reduce<{
  [key: string]: Electron.MenuItem
}>((acc, key) => ({
  ...acc,
  [key]: menu.getMenuItemById(key)
}), {});

ipcMain.on("state-update", (e, state:State) => {
  itemByID.theme.checked = state.prefs.theme === DARK;
  itemByID.open.enabled = state.view !== VIEW.SPLASH;
  itemByID.save.enabled = state.view === VIEW.EDITOR;
});
