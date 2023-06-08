import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "./main.module.scss";
import communityData from "./communityData.json";

const CommunityBox = () => {
  return (
    <>
      <Community>
        <div className={styles.title}>오늘의 커뮤니티</div>
        <div>
          <div>전체</div>
          <table>
            <tr>
              <th>게시글ID</th>
              <th></th>
              <th>제목</th>
              <th>조회수</th>
            </tr>
          </table>
        </div>
      </Community>
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
