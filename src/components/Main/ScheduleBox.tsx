import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";

import styles from "./main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";
import matchData from "./matchData.json";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

interface Match {
  id: number;
  start_day: string;
  start_time: string;
  location: string;
  tema1_id: number;
  team1: string;
  tema1_img: string;
  tema2_id: number;
  team2: string;
  tema2_img: string;
  category: number;
  score1: number;
  score2: number;
  state: string;
  season: string;
}

const MatchContainer = ({ data }) => {
  console.log("나 자식컴포넌트에서 전달받은 데이터야!", data);
  return (
    <>
      {data.map((e: any) => {
        return (
          <MatchBox>
            <LogoImg src={e.tema1_img} />
            <MatchData>
              <div>
                {data.category === 0
                  ? "츅구"
                  : data.category === 1
                  ? "야구"
                  : "e-스포츠"}
              </div>
              <Vs>vs</Vs>
              <State state={e.state}>{e.state}</State>
            </MatchData>
            <LogoImg src={e.tema2_img} />
          </MatchBox>
        );
      })}
    </>
  );
};

const ScheduleBox = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState(matchData.data);

  //선택한 날짜에 해당하는 데이터를 받아옴

  useEffect(() => {
    const editDate: string = format(selectedDate, "yyyy-MM-dd"); //날짜 형식에 맞게 변경
    console.log("editDate", editDate);
    console.log("matchData", data);

    //선택한 날짜에 해당하는 데이터 === 선택한 카테고리, 필터
    const newData = data.filter((data) => data.category === 1);
    console.log("newData", newData);
    setData(newData);
    console.log("data", data);
  }, [selectedDate]); //선택한 날짜가 바뀔 때 마다 data를 바꿈

  return (
    <>
      <ScheduleContainer>
        <div className={styles.title}>경기 일정</div>
        <Body>
          <DateContainer>
            <DatePickerBox
              purpose="main"
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </DateContainer>
          <MatchContainer data={data} />
        </Body>
      </ScheduleContainer>
    </>
  );
};

export default ScheduleBox;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 540px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 160px;
  height: 400px;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 390px;
  height: 400px;
`;

const MatchBox = styled.div`
  display: flex;
  width: 285px;
  height: 95px;
  border-top: 1px solid #d9d9d9;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 100%;
`;

const MatchData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100px;
`;

const Vs = styled.div`
  height: 30px;
  padding: 5px;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
`;

const State = styled.div<{ state: string }>`
  font-size: 14px;
  color: ${(props) => (props.state == "종료" ? "red" : "#8F6EEB")};
`;
