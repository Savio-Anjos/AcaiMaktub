import { combineReducers } from "redux";
import acaiReducer from "./slices/acaiSlice";

export const rootReducer = combineReducers({
  acai: acaiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
