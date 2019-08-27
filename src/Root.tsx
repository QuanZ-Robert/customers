import React, { PropsWithChildren, ReactNode } from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default ({ children, initialState = {} }: PropsWithChildren<any>) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
};
