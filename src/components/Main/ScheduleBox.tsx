import React, { useState } from "react";
import styled from "styled-components";

import styles from "./main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";
import { format } from "date-fns";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

const ScheduleBox = () => {
  const [date, setDate] = useState<Date | null | string>(new Date());

  const handeleSelect = (select: React.SetStateAction<Date | null>) => {
    // @ts-expect-error
    const selectdate = format(select, "yyyy.MM.dd");
    setDate(selectdate);
    console.log(date);
  };

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
