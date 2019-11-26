import { ipcMain } from "electron";
import {
  rendererDispatch,
  openJsonDialog,
  saveJsonDialog,
  rendererToast
} from "./utils";
import { TarzanTaxonomy } from "./types";
import { State, VIEW } from "../renderer/plumbing/constants"

export const blank: TarzanTaxonomy = {
  items: []
};

let currentModel: TarzanTaxonomy | null;

const initModel = () => {
  currentModel = { ...blank };
  rendererDispatch("SET_MODEL", currentModel);
};

ipcMain.on("app-init", initModel);

ipcMain.on("model-new", () => {
  initModel();
  rendererDispatch("GOTO_VIEW", VIEW.EDITOR);
});

ipcMain.on("model-load", async () => {
  const [, doc] = await openJsonDialog();
  if (doc) {
    currentModel = { ...doc };
    rendererDispatch("SET_MODEL", currentModel);
    rendererDispatch("GOTO_VIEW", VIEW.EDITOR);
  }
  else {
    rendererToast("Invalid or no document", "danger");
  }
});

ipcMain.on("state-update", (e, { model }: State) => {
  if (model && currentModel) {
    Object.assign(currentModel, model);
  }
});

ipcMain.on("model-save", async () => {
  if (currentModel && await saveJsonDialog(currentModel)) {
    rendererToast("Model saved!", "success");
    rendererDispatch("GOTO_VIEW", VIEW.WELCOME);
  }
});
