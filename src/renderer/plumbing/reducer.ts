import { ActionType, State, VIEW } from "./constants";

export type Action = {
  type: ActionType;
  payload?: any;
};

export default function reducer(
  state: State,
  { type, payload }: Action
): State {
  console.log(type, payload);
  switch (type) {

    case "SET_PREFS":
      return {
        ...state,
        prefs: {
          ...state.prefs,
          ...payload
        }
      };

    case "GOTO_VIEW":
      return {
        ...state,
        view: payload as VIEW
      };

  }
  return state;
}
