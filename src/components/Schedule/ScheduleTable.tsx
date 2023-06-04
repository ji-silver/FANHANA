import React from "react";
import styled from "styled-components";

import { getDayOfWeek } from "../common/DatePickerBox/DatePickerBox";

interface ScheduleTableProps {
  year: number;
  month: number;
  scheduleData: {
    id: number;
    start_date: string;
    start_time: string;
    location: string;
    team1: string;
    team2: string;
  }[];
}

const ScheduleTable = ({ year, month, scheduleData }: ScheduleTableProps) => {
  const formatDate = (date: string) => {
    const dateArr = date.split("-");
    return `${dateArr[1]}월 ${dateArr[2]}일 (${getDayOfWeek(date)})`;
  };

  const getDaysInMonthArr = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isSameDate = (date1: Date, date2: Date) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
      return true;
    return false;
  };

  return (
    <Table>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeader>날짜</TableHeader>
          <TableHeader>시간</TableHeader>
          <TableHeader>장소</TableHeader>
          <TableHeader>경기</TableHeader>
        </TableRow>
      </TableHead>
      <tbody>
        {getDaysInMonthArr(year, month).map((date) => {
          const scheduleList = scheduleData.filter((schedule) =>
            isSameDate(
              new Date(schedule.start_date),
              new Date(year, month - 1, date)
            )
          );

          if (scheduleList.length > 0) {
            return scheduleList.map((schedule, idx) => (
              <TableRow key={schedule.id}>
                {idx === 0 && (
                  <TableHeader rowSpan={scheduleList.length} className="date">
                    <span>{formatDate(`${year}-${month}-${date}`)}</span>
                  </TableHeader>
                )}
                <TableCell>{schedule.start_time.slice(0, 5)}</TableCell>
                <TableCell>{schedule.location}</TableCell>
                <TableCell>{`${schedule.team1} vs ${schedule.team2}`}</TableCell>
              </TableRow>
            ));
          }

          return (
            <TableRow key={date} className="empty">
              <TableHeader className="date">
                {formatDate(`${year}-${month}-${date}`)}
              </TableHeader>
              <TableCell colSpan={3}>경기가 없습니다.</TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ScheduleTable;

const Table = styled.table`
  margin-top: 25px;
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f3f3f3;
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  vertical-align: middle;

  &.date {
    border-right: 1px solid #f3f3f3;
  }
  span {
    font-weight: bold;
  }
`;

const TableRow = styled.tr`
  &.empty {
    color: #999;
    font-size: 14px;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  text-align: center;
`;
