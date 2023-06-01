import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import Button from "./components/common/Button";

function App() {
  return (
    <div className="App">
      <Button
        purpose="base"
        content="내sosooooooooooooooo내용"
        disabled={true}
      ></Button>

      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
          <Route path="/mypage"></Route>
          <Route path="/soccer"></Route>
          <Route path="/baseball"></Route>
          <Route path="/esport"></Route>
          <Route path="/shorts"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
