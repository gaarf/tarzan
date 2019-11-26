import React, { useRef, useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import reducer from "./reducer";
import { ActionType, State, THEME, VIEW } from "./constants";

const initalState: State = {
  view: VIEW.SPLASH,
  prefs: {
    theme: THEME.LIGHT
  }
};

type Dispatch = (type: ActionType, payload?: any) => void;

type Selector<T> = (state: State) => T;

const listeners = new Map<
  React.Ref<Selector<any>>,
  [Selector<any>, React.Dispatch<any>]
>();

let state: State = initalState;

if (module.hot) {
  module.hot.dispose(data => {
    data.state = state;
  });
  const { data } = module.hot;
  if (data) {
    state = data.state;
  }
}

export const dispatch: Dispatch = (type, payload) => {
  let i = 0;
  const prevValues = Array.from(listeners, ([_, [getValue]]) =>
    getValue(state)
  );

  state = reducer(state, { type, payload });
  ipcRenderer.send("state-update", state);

  listeners.forEach(([getValue, setValue]) => {
    const value = getValue(state);
    if (value !== prevValues[i++]) {
      setValue(value);
    }
  });
};

ipcRenderer.on("dispatch", (_, type: ActionType, payload) => {
  dispatch(type, payload);
});

export function useGlobalStore<T>(getValue?: Selector<T>): [T, Dispatch] {
  const key = useRef(getValue || null);
  const [value, setValue] = useState(getValue && getValue(state));

  useEffect(() => {
    if (getValue) {
      listeners.set(key, [getValue, setValue]);
    }
    return () => {
      if (getValue) {
        listeners.delete(key);
      }
    };
  }, []);

  return [value as T, dispatch];
}
