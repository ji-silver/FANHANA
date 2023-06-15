import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "date-fns";

import KakaoMap from "../components/Stadium/KakaoMap";
import { Schedule } from "./SchedulePage";

const StadiumPage = () => {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  useEffect(() => {
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
  }, []);
  return (
    <Container>
      <KakaoMap schedule={scheduleData} />
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
