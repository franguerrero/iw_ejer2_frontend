import IRoute from "../models/IRoute";

export const ACTION_NAVIGATE = "action-navigate";

export interface INavigatePayload {
  key: string;
}

export interface INavigateAction {
  type: typeof ACTION_NAVIGATE;
  payload: INavigatePayload;
}

export interface INavigateState {
  routes: IRoute[];
}
