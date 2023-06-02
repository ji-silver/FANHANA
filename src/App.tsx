import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";
import DatePickerBox from "./components/common/DatePickerBox/DatePickerBox";

function App() {
  return (
    <div className="App">
      <DatePickerBox />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, autem
      laborum? Ut nulla in laboriosam? Minima repellendus ut excepturi,
      officiis, sint quasi voluptatibus corrupti dignissimos pariatur alias
      mollitia sapiente itaque?
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
