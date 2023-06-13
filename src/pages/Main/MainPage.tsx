import React from "react";
import styled from "styled-components";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/WeatherBox";
import RankBox from "../../components/Main/RankBox";
import CommunityBox from "../../components/Main/CommunityBox";
import ShortsBox from "../../components/Main/ShortsBox";

const MainPage = () => {
  //메인페이지 로딩시 게시판 데이터, 쇼츠 데이터 받아옴

  return (
    <>
      <div className={styles.body}>
        {/* <ScheduleBox />
        <ShortsBox />
        <WeatherBox />
        <CommunityBox /> */}
        <RankBox />
      </div>
    </>
  );
};

export default MainPage;
