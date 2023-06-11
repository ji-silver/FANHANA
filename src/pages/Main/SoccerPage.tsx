import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "../../styles/main.module.scss";
import ScheduleBox from "../../components/Main/ScheduleBox";
import ShortsBox from "../../components/Main/ShortsBox";
import CommunityBox from "../../components/Main/CommunityBox";
import RankBox from "../../components/Main/RankBox";

const SoccerPage = () => {
  return (
    <>
      <div className={styles.body}>
        <ScheduleBox />
        <ShortsBox />
        <CommunityBox />
        <RankBox />
      </div>
    </>
  );
};

export default SoccerPage;
