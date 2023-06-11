import React, { ReactNode, FC } from 'react'
import styled from "styled-components";
import RecordHeader from '../components/Record/RecordHeader';

interface RecordTableProps {
    headerTitle: ReactNode[];
    teamHeaderElements?: ReactNode[];
    tbodyData?: ReactNode;
    teamDatas?: ReactNode;
    selectedSeasonCallback: (selectedSeason: string) => void
};

const RecordPage: FC<RecordTableProps> = ({ headerTitle, teamHeaderElements, tbodyData, teamDatas, selectedSeasonCallback }) => {

    // 오늘 날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();


    const generateCols = (length: number) => {
        const cols = new Array(length).fill("10%");
        cols[0] = "5%";
        cols[1] = "30%";

        return cols;
    };

    // headerTitle 개수만큼 table col 개수 정해주기
    const cols = generateCols(headerTitle.length);
    const colgroupElements = cols.map((colWidth, index) => <col key={index} width={colWidth} />);


    return (
        <>
            <Container>
                <RecordHeader selectedSeasonCallback={selectedSeasonCallback} />
                <TodayDivDesktop>※{year}년 {month}월 {day}일 기준</TodayDivDesktop>
                <TodayDivMobile>{('' + year).slice(-2)}.{month < 10 ? '0' + month : month}.{day < 10 ? '0' + day : day}</TodayDivMobile>
                <DesktopTableWrap>
                    <Table>
                        <colgroup>
                            {colgroupElements}
                        </colgroup>
                        <Thead>
                            <tr>
                                {headerTitle}
                            </tr>
                        </Thead>
                        <Tbody>
                            {tbodyData}
                        </Tbody>
                    </Table>
                </DesktopTableWrap>

                <MobileTableWrap>
                    <FirstTable>
                        <RankTeamTable>
                            <Colgroup>
                                {colgroupElements}
                            </Colgroup>
                            <Thead>
                                <tr>
                                    {teamHeaderElements}
                                </tr>
                            </Thead>
                            <Tbody>
                                {teamDatas}
                            </Tbody>
                        </RankTeamTable>
                    </FirstTable>

                    <SecondTable>
                        <RankScrollTable>
                            <Colgroup>
                                {colgroupElements}
                            </Colgroup>
                            <Thead>
                                <tr>
                                    {headerTitle}
                                </tr>
                            </Thead>
                            <Tbody>
                                {tbodyData}
                            </Tbody>
                        </RankScrollTable>
                    </SecondTable>
                </MobileTableWrap>

            </Container>
        </>
    );
}

export default RecordPage;

const Container = styled.div`
    position: relative;
    padding: 30px 162px;

    @media (max-width: 1024px){
        padding: 30px 0;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        padding: 20px 0;
    }
`

const TodayDivDesktop = styled.div`
    display: block;
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;
    text-align: right;

    @media (max-width: 1024px) {
        display: none;
  }
`

const TodayDivMobile = styled.div`
    display: none;

    @media (max-width: 1024px) {
        position: absolute;
        display: block;
        padding-right: 15px;
        top: 55px;
        right: 0;
        text-align: right;
    }

    @media (max-width: 768px) {
        top: 43px;
    }
`

const DesktopTableWrap = styled.div`
    display: block;

    @media (max-width: 768px) {
        display: none;
  }
`

const MobileTableWrap = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: relative;
        
  }
`

const Table = styled.table`
    width: 100%;
    position: relative;
    text-align: center;
`

const Thead = styled.thead`
    height: 44px;
    background-color: #f7f7f7;
    font-weight: bold;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    th {
        vertical-align: middle;
    }

    @media (max-width: 768px) {
        height: 40px;
    }
`

// 행 홀수, 짝수별로 배경 색 다르게 하기
const Tbody = styled.tbody`
    tr:nth-child(even) {
        background-color: #FBFAFE;
    }
    tr:nth-child(odd) {
        background-color: #ffffff;
    }
`

const FirstTable = styled.div`
    width: 180px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

const SecondTable = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap; 
    scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }

`

const RankTeamTable = styled(Table)`
    width: 100%;
`

const RankScrollTable = styled(Table)`
    width: max-content;
    min-width: 100%;
`

const Colgroup = styled.colgroup`
    & > col {
        width: inherit;
    }
    & > col:nth-child(1) {
        width: 30px;
    }

    & > col:nth-child(2) {
        width: 150px;
    }
`