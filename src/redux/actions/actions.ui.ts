import { ReactNode } from "react";

export const ACTION_UI_LOADING = "action-ui-loading";
export const ACTION_UI_ACTIONS = "action-ui-actions";

export enum UiActions {
  ToggleLoadingIcon = "action-toggle-loading",
  SetHeaderExtra = "action-set-header-extra",
}

export interface IUiActionPayload {
  extra?: IExtraProps<any>[];
  isLoading?: boolean;
}

export interface IUiAction {
  type: UiActions;
  payload: IUiActionPayload;
}

export interface IUiState {
  extra?: IExtraProps<any>[];
  isLoading: boolean;
}

export const toggleLoading = (isLoading: boolean): IUiAction => ({
  type: UiActions.ToggleLoadingIcon,
  payload: { isLoading },
});

export const setHeaderExtra = <T>(extra: IExtraProps<T>[]): IUiAction => ({
  type: UiActions.SetHeaderExtra,
  payload: { extra },
});

export interface IExtraProps<T> {
  component: React.FunctionComponent<T>;
  props: T;
  children: ReactNode[];
}
