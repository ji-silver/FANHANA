import React from "react";
import styled from "styled-components";

import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/WeatherBox";
import RankBox from "../../components/Main/RankBox";
import CommunityBox from "../../components/Main/CommunityBox";
import ShortsBox from "../../components/Main/ShortsBox";

const MainPage = () => {
  return (
    <>
      <Body>
        <ScheduleBox />
        <ShortsBox />
        <WeatherBox />
        <CommunityBox />
        <RankBox />
      </Body>
    </>
  );
};

export default MainPage;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1642px;
`;
