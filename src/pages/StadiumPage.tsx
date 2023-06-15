import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

import KakaoMap from "../components/Stadium/KakaoMap";
import { Schedule } from "./SchedulePage";

const StadiumPage = () => {
  const location = useLocation();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(
    location.state?.schedule || null
  );

  useEffect(() => {
    // 일정 페이지에서 넘어온 경우 해당 경기장만 보여줌
    if (schedule) {
      setScheduleData([schedule]);
      return;
    }

    // 일정 페이지에서 넘어오지 않은 경우 오늘 진행되는 경기의 경기장 보여줌
    const getScheduleData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/schedule/day/${format(
            new Date(),
            "yyyy-MM-dd"
          )}`
        );
        setScheduleData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getScheduleData();
  }, [schedule]);

  return (
    <Container>
      <KakaoMap scheduleList={scheduleData} />
    </Container>
  );
};

export default StadiumPage;

const Container = styled.div`
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
