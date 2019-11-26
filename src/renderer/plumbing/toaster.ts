import { Position, Toaster, IToastProps, Intent } from "@blueprintjs/core";
import { ipcRenderer } from "electron";

export const AppToaster = Toaster.create({
  position: Position.BOTTOM
});

export function showToast(
  message: string,
  props?: Omit<IToastProps, "message">,
  key?: string
) {
  AppToaster.show({ message, ...props }, key);
}

ipcRenderer.on("toast", (_, message:string, intent?:Intent) => AppToaster.show({ message, intent }));
