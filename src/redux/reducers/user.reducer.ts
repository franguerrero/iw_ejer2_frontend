import { IUserAction, IUserState, UserActions } from "../actions/actions.user";

const initialState: IUserState = {
  isAdmin: false,
  isAuthenticated: false,
};

export default function (state = initialState, action: IUserAction): IUserState {
  switch (action.type) {
    case UserActions.Authenticate:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
}
