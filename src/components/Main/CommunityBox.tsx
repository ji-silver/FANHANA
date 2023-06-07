import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "./main.module.scss";

const CommunityBox = () => {
  return (
    <>
      <Community></Community>
    </>
  );
};

export default CommunityBox;

const Community = styled.div`
  display: flex;
  flex-direction: column;
  width: 1190px;
  height: 625px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
`;
