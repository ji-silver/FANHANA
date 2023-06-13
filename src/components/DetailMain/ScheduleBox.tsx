import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";

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

const today = format(new Date(), "yyyy-MM-dd");
const currentTime = format(new Date(), "hh:mm:ss");

// @ts-expect-error
const MatchContainer = ({ categoryData }) => {
  // @ts-expect-error
  const compareTime = (time) => {
    if (currentTime < time) {
      return "종료";
    }
    if (currentTime === time) {
      return "진행중";
    }
    return `${time.slice(0, 5)} 예정`;
  };

  return (
    <>
      {categoryData.map((e: any) => {
        return (
          <MatchBox>
            <ImgBox>
              <LogoImg src={e.tema1_img} />
              <div>{e.team1}</div>
            </ImgBox>
            <MatchData>
              <div>{e.season}</div>
              <Vs>vs</Vs>
              <State state={e.state}>
                {today > e.start_day ? "종료" : compareTime(e.start_time)}
              </State>
            </MatchData>
            <ImgBox>
              <LogoImg src={e.tema2_img} />
              <div>{e.team2}</div>
            </ImgBox>
          </MatchBox>
        );
      })}
    </>
  );
};

const ScheduleBox = ({ category }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateData, setDateData] = useState([]);

  //날짜당 데이터 받아옴
  const getSceduleData = async (date: any) => {
    const selectdate = format(date, "yyyy-MM-dd");

    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/schedule/day/${selectdate}`
      );
      setDateData(res.data.data);
    } catch (error) {
      console.error("경기순위 불러오는거 실패함", error);
    }
  };

  useEffect(() => {
    console.log("dateData", dateData);
    console.log("selectCategoty", category);
    const data = dateData.filter((data) => data.category === category);
    const newData = [...data];
    setDateData(newData);
  }, [selectedDate]);

  return (
    <>
      <ScheduleContainer>
        <Header>
          <div className={styles.title}>경기 일정</div>
        </Header>
        <Body>
          <DateContainer>
            <DatePickerBox
              purpose="main"
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </DateContainer>
          <MatchContainer categoryData={dateData} />
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
  justify-content: flex-start
  align-items: center;
  flex-direction: column;
  width: 160px;
  height: 40px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 390px;
  height: 430px;
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
  margin: 5px;
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
  color: ${(props) =>
    props.state == "종료"
      ? "red"
      : props.state == "예정"
      ? "#8F6EEB"
      : "#4EAF51"};
`;

const ImgBox = styled.div`
  display: flex;
  width: 70px;
  height: 96px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
