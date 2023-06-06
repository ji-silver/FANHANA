import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import Button from "./components/common/Button/Button";
import LoginPage from "./pages/login";
import JoinPage from "./pages/join";

function App() {
  return (
    <div className="App">
      <Router>
        <div style={{ width: 100, height: 100 }}>
          <Button
            disabled={false}
            purpose={"reportPost"}
            content={"등록하기"}
          ></Button>
        </div>

        <Routes>
          <Route path="/"></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
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
