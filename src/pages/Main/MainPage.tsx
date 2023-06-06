import React from "react";

import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/WeatherBox";
import RankBox from "../../components/Main/RankBox";

const MainPage = () => {
  return (
    <>
      <ScheduleBox />
      <WeatherBox />
      <RankBox />
    </>
  );
};

export default MainPage;
