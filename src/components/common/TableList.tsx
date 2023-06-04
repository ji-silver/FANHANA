import React, { useState } from "react";
import styled from "styled-components";

interface TableProps {
  full?: boolean;
  mini?: boolean;
}

const TableContainer = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

const TableHeader = styled.th<{ hide?: boolean }>`
  font-weight: bold;
  padding: 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: ${(props) => (props.hide ? "none" : "table-cell")};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e3e3e3;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td<{ width?: string }>`
  padding: 8px;
  box-sizing: border-box;
  width: ${(props) => props.width || "auto"};
`;

const TableList: React.FC<TableProps> = ({ full, mini }) => {
  return (
    <TableContainer>
      <thead>
        <TableRow>
          {full && <TableHeader hide={mini}>체크</TableHeader>}
          <TableHeader hide={mini}>번호</TableHeader>
          {full && <TableHeader hide={mini}>분류</TableHeader>}
          <TableHeader hide={mini}>제목</TableHeader>
          {full && <TableHeader hide={mini}>날짜</TableHeader>}
          <TableHeader hide={mini}>조회수</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          {full && (
            <TableCell width="50px">
              <input type="checkbox" />
            </TableCell>
          )}
          <TableCell width="100px">1</TableCell>
          {full && <TableCell width="150px">분류1</TableCell>}
          <TableCell>제목1</TableCell>
          {full && <TableCell width="150px">2023-05-18</TableCell>}
          <TableCell width="100px">10</TableCell>
        </TableRow>
        <TableRow>
          {full && (
            <TableCell width="50px">
              <input type="checkbox" />
            </TableCell>
          )}
          <TableCell width="100px">2</TableCell>
          {full && <TableCell width="150px">분류2</TableCell>}
          <TableCell>제목2</TableCell>
          {full && <TableCell width="150px">2023-05-17</TableCell>}
          <TableCell width="100px">5</TableCell>
        </TableRow>
      </tbody>
    </TableContainer>
  );
};

export default TableList;
