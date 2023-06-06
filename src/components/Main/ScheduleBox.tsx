import React, { useState } from "react";
import styled from "styled-components";

import styles from "./main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

const ScheduleBox = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handeleSelect = (select: React.SetStateAction<Date | null>) => {
    setDate(select);
    console.log(date);
  };

  return (
    <>
      <ScheduleContainer>
        <div className={styles.title}>경기 일정</div>
        <DatePickerBox purpose="main" handeleSelect={handeleSelect} />
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
