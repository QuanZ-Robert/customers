import { combineReducers } from "redux";
import customerReducer from "./customerReducer";

export const rootReducer = combineReducers({
  customers: customerReducer
});

export type TAppState = ReturnType<typeof rootReducer>;
