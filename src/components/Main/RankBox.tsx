import React, { useEffect, useState } from "react";
import styled from "styled-components";

import styles from "../../styles/main.module.scss";
import rankData from "./rankData.json";
import teamData from "../../pages/Record/teamData.json";
import category from "./category.json";

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
  const headers = ["순위", "팀명", "경기", "승", "패", "무", "승률"];
  const [targetCatrgory, setTargetCatrgory] = useState(category[0]);
  const [data, setData] = useState<Rank[]>([rankData[0]]); // Set data as an array

  //승률변환 함수
  const calculateWinRate = (rank: Rank) => {
    const { wins, losses } = rank;
    const totalGames = wins + losses;
    const winRate = (wins / totalGames) * 100;

    return winRate.toFixed(2);
  };

  //카테고리 입력시, 해당하는 팀의 rankData를 찾아서 승률 삽입->정렬 후 반환
  const getTeamsWithWinRate = (targetCatrgory: any) => {
    const targetTeam = teamData.filter(
      (team) => team.category === targetCatrgory._id
    );

    const teamIdsToFind = targetTeam.map((e) => Number(e._id));
    const targetRanks = rankData.filter((item) =>
      teamIdsToFind.includes(item.team_id)
    );

    // 팀별 승률 계산 및 정렬
    const teamsWithWinRate = targetRanks.map((rank) => {
      const winRate = calculateWinRate(rank);
      return { ...rank, winRate };
    });
    // @ts-expect-error
    teamsWithWinRate.sort((a, b) => b.winRate - a.winRate);
    return teamsWithWinRate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let targetId = Number(e.target.value);
    return setTargetCatrgory(category[targetId]);
  };

  useEffect(() => {
    const targetData = getTeamsWithWinRate(targetCatrgory);
    const newData = [...targetData];
    // @ts-expect-error
    setData(newData);
  }, [targetCatrgory]);

  useEffect(() => {
    setTargetCatrgory(category[0]);
    const targetData = getTeamsWithWinRate(targetCatrgory);
    // @ts-expect-error
    setData(targetData);
  }, []);

  return (
    <>
      <RankContainer>
        <RankHeader>
          <div className={styles.title}>경기 순위</div>
          <select
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {category.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </RankHeader>
        <RankTable>
          <HeaderTr>
            {headers.map((item, index) => {
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
`;
const RankHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RankTable = styled.table`
  displayl: flex;
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
