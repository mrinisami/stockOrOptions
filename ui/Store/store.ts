import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import optionCompReducer from "../States/optionComp";

export const store = configureStore({
  reducer: {
    optionComp: optionCompReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
