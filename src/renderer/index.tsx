import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (module.hot) {
  module.hot.accept();
}

// @ts-ignore
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

ReactDOM.render(<App />, document.getElementById("app"));
