import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "./main.module.scss";
import communityData from "./communityData.json";

interface Data {
  id: number;
  title: string;
  views: number;
  category: number;
}

const TableHeader = () => {
  return (
    <HeaderTr>
      <th>게시글ID</th>
      <th>제목, 댓글</th>
      <th>조회수</th>
    </HeaderTr>
  );
};

const BoardBox = ({ data }) => {
  return (
    <BoardContainer>
      <BoardTitle>{data.category}</BoardTitle>
      <Table>
        <TableHeader />
        <PostList data={data.data} />
      </Table>
    </BoardContainer>
  );
};

// @ts-expect-error
const PostList = ({ data }) => {
  return (
    <>
      {data.map((post) => {
        return (
          <PostTr key={post.id}>
            <Td>{post.id}</Td>
            <PostTitle>{post.title}</PostTitle>
            <Td>{post.views}</Td>
          </PostTr>
        );
      })}
    </>
  );
};

const CommunityBox = () => {
  //메인 게시판 데이터 받아와서 communityData에 저장
  //카테고리별로 들어옴
  //allData soccerData baseballData eSportsData

  const allData = communityData;

  return (
    <>
      <Community>
        <div className={styles.title}>오늘의 커뮤니티</div>
        <PostListContainer>
          <BoardBox data={allData} />
          <BoardBox data={allData} />
          <BoardBox data={allData} />
          <BoardBox data={allData} />
        </PostListContainer>
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

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1190px;
  height: 675px;
`;

const BoardContainer = styled.div`
  flex-wrap: wrap;
  width: 550px;
  height: 250px;
  border: 1px solid #d9d9d9;
  margin: 16px 15px 16px 25px;
`;

const BoardTitle = styled.div`
  font-size: 18px;
  width: 100px;
  height: 35px;
  font-weight: 400;
  font-size: 18px;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: 200px;
`;

const HeaderTr = styled.tr`
  display: none;
`;

const PostTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 530px;
  height: 50px;
  border-bottom: 1px solid #cccccc;
`;

const PostTitle = styled.td`
  width: 350px;
`;

const Td = styled.td`
  width: 60px;
`;
