import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Root from "./Root";
import { BrowserRouter, Route, Router } from "react-router-dom";
import history from "./history";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </BrowserRouter>
  </Root>,
  document.getElementById("root")
);
