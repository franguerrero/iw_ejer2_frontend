import { getRouteStack, routes } from "../../routes";
import { ACTION_NAVIGATE, INavigateAction, INavigateState } from "../actions.types";

const initialState: INavigateState = {
  routes: [],
};

export default function (state = initialState, action: INavigateAction): INavigateState {
  switch (action.type) {
    case ACTION_NAVIGATE:
      return {
        ...state,
        routes: getRouteStack(routes, action.payload.key),
      };
    default:
      return state;
  }
}
