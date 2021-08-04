import { combineReducers } from "redux";
import navigate from "./navigate.reducer";
import ui from "./ui.reducer";
import user from "./user.reducer";

export const reducer = combineReducers({ navigate, ui, user });
export type IStoreState = ReturnType<typeof reducer>;
