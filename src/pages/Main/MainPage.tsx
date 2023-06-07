import React from "react";

import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/WeatherBox";
import RankBox from "../../components/Main/RankBox";
import CommunityBox from "../../components/Main/CommunityBox";

const MainPage = () => {
  return (
    <>
      <ScheduleBox />
      <WeatherBox />
      <RankBox />
      <CommunityBox />
    </>
  );
};

export default MainPage;
