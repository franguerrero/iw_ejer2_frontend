import { IUiAction, IUiState, UiActions } from "../actions/actions.ui";

const initialState: IUiState = {
  isLoading: false,
};

export default function (state = initialState, action: IUiAction): IUiState {
  switch (action.type) {
    case UiActions.SetHeaderExtra:
      return {
        ...state,
        extra: action.payload.extra,
      };
    case UiActions.ToggleLoadingIcon:
      return {
        ...state,
        isLoading: action.payload.isLoading || false,
      };
    default:
      return state;
  }
}
