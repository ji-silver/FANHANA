import { style } from "@mui/system";
import React from "react";
import styled from "styled-components";

import styles from "./main.module.scss";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

const ScheduleBox = () => {
  return (
    <>
      <ScheduleContainer>
        <div className={styles.title}>경기 일정</div>
      </ScheduleContainer>
    </>
  );
};

export default ScheduleBox;

const ScheduleContainer = styled.div`
  width: 390px;
  height: 540px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
`;
