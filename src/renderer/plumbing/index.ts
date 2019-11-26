export { useGlobalStore, dispatch } from "./store";
export * from "./style";
export * from "./usePromise";
export * from "./reducer";
export * from "./constants";
export * from "./toaster";

export function delay(ms = 1000): Promise<number> {
  return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}

export function plural(count: number, singular: string): string {
  return count === 0
    ? `no ${singular}s`
    : `${count} ${singular}${count > 1 ? "s" : ""}`;
}
