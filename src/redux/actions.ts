import { ACTION_NAVIGATE, INavigateAction, INavigatePayload } from "./actions.types";

export const navigate = (payload: INavigatePayload): INavigateAction => ({
  type: ACTION_NAVIGATE,
  payload,
});
