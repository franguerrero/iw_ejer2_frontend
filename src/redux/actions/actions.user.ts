

export enum UserActions {
  Authenticate = "action-user-authenticate",
}

export interface IUserActionPayload {
  isAdmin: boolean;
}

export interface IUserAction {
  type: UserActions;
  payload: IUserActionPayload;
}

export interface IUserState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const authenticateUser = (isAdmin: boolean): IUserAction => ({
  type: UserActions.Authenticate,
  payload: { isAdmin},
});
