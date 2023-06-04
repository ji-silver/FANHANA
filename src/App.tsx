import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/App.css";
import DatePickerBox from "./components/common/DatePickerBox/DatePickerBox";

import LoginPage from "./pages/login";
import JoinPage from "./pages/join";
import MyWrite from "./pages/MyWrite";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/join" element={<JoinPage/>}></Route>
          <Route path="/register"></Route>
          <Route path="/mypage">
            <Route path="MyWrite" element={<MyWrite />} />
            <Route path="MyPicture" element={<div>동영상</div>} />
            <Route path="MyInfo" element={<div>내정보</div>} />
          </Route>
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
