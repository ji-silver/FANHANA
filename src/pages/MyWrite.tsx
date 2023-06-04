import React from "react";
import styled, { css } from "styled-components";
import TableList from "./../components/common/TableList";


const MyWrite: React.FC = () => {
  return (
    <div>
      <h1>Full Table</h1>
      <TableList full />

      <h1>Mini Table</h1>
      <TableList mini />
    </div>
  );
};

export default MyWrite;
