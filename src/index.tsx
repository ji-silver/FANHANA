import React from "react";
import ReactDOM from "react-dom/client";

import ResetStyle from "./ResetStyle";
import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResetStyle />
    <App />
  </React.StrictMode>
);
