import { dialog, FileFilter } from "electron";
import fs from "fs";
import { promisify } from "util";
import { getMainWindow } from "./index";
import { ActionType } from "../renderer/plumbing";
import { TarzanTaxonomy } from "./types";
import { Intent } from "@blueprintjs/core";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const jsonFilter: FileFilter = { name: "JSON", extensions: ["json"] };

async function openJsonDialog(): Promise<[string | null, TarzanTaxonomy?]> {
  const { filePaths } = await dialog.showOpenDialog(getMainWindow(), {
    properties: ["openFile"],
    filters: [jsonFilter]
  });
  const [path] = filePaths || [];
  if (!path) {
    return [null];
  }

  const data = await readFile(path, { encoding: "utf8" });
  const { taxonomy } = JSON.parse(data);
  return [path, taxonomy];
}

async function saveJsonDialog(model: TarzanTaxonomy): Promise<boolean> {
  const { filePath } = await dialog.showSaveDialog(getMainWindow(), {
    filters: [jsonFilter]
  });

  if (filePath) {
    await writeFile(filePath, JSON.stringify(model));
    return true;
  }

  return false;
}

function rendererDispatch(action: ActionType, payload?: any) {
  const mainWindow = getMainWindow();
  if (mainWindow) {
    mainWindow.webContents.send("dispatch", action, payload);
  }
}

function rendererToast(message: string, intent?: Intent) {
  const mainWindow = getMainWindow();
  if (mainWindow) {
    mainWindow.webContents.send("toast", message, intent);
  }
}

export {
  openJsonDialog,
  saveJsonDialog,
  rendererDispatch,
  rendererToast
};
