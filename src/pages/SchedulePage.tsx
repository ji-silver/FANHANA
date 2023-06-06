import React, { useEffect, useState } from "react";
import styled from "styled-components";

import DatePickerBox from "../components/common/DatePickerBox/DatePickerBox";
import TeamList from "../components/Schedule/TeamList";
import ScheduleTable from "../components/Schedule/ScheduleTable";
import ArrowButton from "../components/common/Button/ArrowButton";

export interface Team {
  id: number;
  name: string;
  category: number;
  img: string;
}

export interface Schedule {
  id: number;
  start_date: string;
  start_time: string;
  location: string;
  team1: string;
  team2: string;
  team1_img: string;
  team2_img: string;
  score1: number;
  score2: number;
  state: string;
}

const SchedulePage = () => {
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const onSelect = (id: number) => {
    setSelectedTeamId(id);
  };

  const setPrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
  };

  const setNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  };

  return (
    <Container>
      <ScheduleContentContainer>
        <DateSelectContainer>
          <Button onClick={setPrevMonth}>
            <ArrowButton size="large" rotate={true} />
          </Button>
          <DatePickerBox
            purpose="schedule"
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <Button onClick={setNextMonth}>
            <ArrowButton size="large" />
          </Button>
        </DateSelectContainer>
        <TeamList
          teamList={teamList}
          selectedTeam={selectedTeamId}
          onSelect={onSelect}
          category={1}
        />
        <ScheduleTable
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          scheduleData={scheduleData}
        />
      </ScheduleContentContainer>
    </Container>
  );
};

export default SchedulePage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ScheduleContentContainer = styled.div`
  margin: 0 auto;
  margin-top: 160px;
  width: calc(100vw - 324px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
