import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import { getCategoryName } from "../common/Dropdown";

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

const BoardBox = ({ category }: { category: number }) => {
  const [boardData, setBoardData] = useState([]);

  const getCategoryName = (category?: number | undefined) => {
    if (category && category < 3) return "최신";
    return "전체";
  };

  //카테고리별로 게시판 데이터 받아와서 communityData에 저장
  useEffect(() => {
    const getBoardData = async (category?: any) => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/post/main?category=${category}`
        );
        setBoardData(res.data.data);
      } catch (error) {
        console.error("게시판 불러오는거 실패함", error);
      }
    };
    getBoardData(category);
  }, []);

  const name = getCategoryName(category);

  return (
    <BoardContainer>
      <BoardTitle>{name} 게시판</BoardTitle>
      <Table>
        <TableHeader />
        <PostList data={boardData} />
      </Table>
    </BoardContainer>
  );
};

// @ts-expect-error
const PostList = ({ data }) => {
  return (
    <>
      {data.map((post: any) => {
        return (
          <PostTr key={post.id}>
            <Td>{post.id}</Td>
            <PostTitle>
              {post.title.length >= 30
                ? post.title.substr(0, 25) + `....`
                : post.title}
            </PostTitle>
            <Td>{post.views}</Td>
          </PostTr>
        );
      })}
    </>
  );
};

const CommunityBox = ({ category }: { category: number }) => {
  const sportsName = getCategoryName(category);

  return (
    <>
      <CommunityContainer>
        <div className={styles.title}>오늘의 커뮤니티 {`> ${sportsName}`} </div>
        <Body>
          <PostListContainer>
            <BoardBox category={category} />
          </PostListContainer>
        </Body>
      </CommunityContainer>
    </>
  );
};

export default CommunityBox;

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1190px;
  height: 625px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
  margin-top: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 1190px;
  height: 550px;
  padding-top: 10px;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 1190px;
  height: 550px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;

const BoardContainer = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  width: 550px;
  height: 220px;
`;

const BoardTitle = styled.div`
  font-size: 18px;
  width: 150px;
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
