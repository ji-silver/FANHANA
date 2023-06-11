import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import rankData from "./Dummy/rankData.json";
import teamData from "./Dummy/teamData.json";
import category from "./Dummy/category.json";
import Dropdown from "../common/Dropdown";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

interface Rank {
  _id: string;
  season: string;
  wins: number;
  drawns: number;
  losses: number;
  winRate?: number;
  team_id: number;
}

const RankBox = () => {
  const HEADER_LIST = ["순위", "팀명", "경기", "승", "패", "무", "승률"];
  const [targetCatrgory, setTargetCatrgory] = useState(0);
  const [data, setData] = useState<Rank[]>([]);

  const dropdownSelect = (item) => {
    setTargetCatrgory(item);
  };

  const getRankData = async (category: any) => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/rank/${category}/${season}`
      );
      //setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("랭크데이터 불러오는거 실패함", error);
    }
  };

  //승률변환 함수
  const calculateWinRate = (rank: Rank) => {
    const { wins, losses } = rank;
    const totalGames = wins + losses;
    const winRate = (wins / totalGames) * 100;

    return winRate.toFixed(2);
  };

  //rankData 받아서 승률 삽입->정렬 후 반환
  const getTeamsWithWinRate = (data: any) => {
    const teamsWithWinRate = data.map((rank) => {
      const winRate = calculateWinRate(rank);
      return { ...rank, winRate };
    });

    // @ts-expect-error
    const sortData = teamsWithWinRate.sort((a, b) => b.winRate - a.winRate);
    sortData.slice(4);
    return sortData;
  };

  //페이지 로딩시 default category(=축구) 데이터 받아옴
  // useEffect(() => {
  //   getRankData(targetCatrgory);
  //   // @ts-expect-error
  //   setData(targetData);
  //   const targetData = getTeamsWithWinRate(data);
  // }, []);

  // //카테고리 변경시 data 변경
  // useEffect(() => {
  //   getRankData(targetCatrgory);
  //   const targetData = getTeamsWithWinRate(data);
  //   const newData = [...targetData];
  //   setData(newData);
  // }, [targetCatrgory]);

  // console.log("data", data);

  return (
    <>
      <RankContainer>
        <Header>
          <div className={styles.title}>경기 순위</div>
          <Dropdown purpose="small" dropdownSelect={dropdownSelect} />
        </Header>
        <RankTable>
          <HeaderTr>
            {HEADER_LIST.map((item, index) => {
              return <RankTh key={index}>{item}</RankTh>;
            })}
          </HeaderTr>
          {data.map((item, index) => {
            return (
              <Tr key={item._id}>
                <TdSm>{index + 1}</TdSm>
                <TdLa>
                  {item.team_id}
                  {/*item.name*/}
                </TdLa>
                <TdSm>{item.wins + item.losses + item.drawns}</TdSm>
                <TdSm>{item.wins}</TdSm>
                <TdSm>{item.losses}</TdSm>
                <TdSm>{item.drawns}</TdSm>
                <TdLa>{item.winRate}%</TdLa>
              </Tr>
            );
          })}
        </RankTable>
      </RankContainer>
    </>
  );
};

export default RankBox;

const RankContainer = styled.div`
  display: flex;
  width: 400px;
  height: 298px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
  flex-direction: column;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;
const RankTable = styled.table`
  display: flex;
  width: 360px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
`;
const RankTh = styled.th`
  font-size: 16px;
  font-weight: 400;
  width: 50px;
`;
const HeaderTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  height: 31px;
`;
const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 359px;
  height: 33px;
  border-bottom: 1px solid #d9d9d9;
`;
const TdSm = styled.td`
  font-size: 14px;
  text-align: center;
  width: 44px;
`;
const TdLa = styled.td`
  font-size: 14px;
  text-align: center;
  width: 50px;
`;
