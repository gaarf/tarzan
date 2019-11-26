import { getMainWindow } from "./index";
import { ActionType } from "../renderer/plumbing";
import { Intent } from "@blueprintjs/core";



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
  rendererDispatch,
  rendererToast
};
