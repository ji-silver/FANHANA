import React, { ReactNode, FC } from 'react'
import styled from "styled-components";
import Header from '../components/common/Header/Header';
import RecordHeader from '../components/Record/RecordHeader';

interface RecordTableProps {
    headerTitle: ReactNode[];
    tbodyData: ReactNode;
    selectedSeasonCallback: (selectedSeason: string) => void
};

const RecordPage: FC<RecordTableProps> = ({ headerTitle, tbodyData, selectedSeasonCallback }) => {

    // 오늘 날짜 가져오기
    const today = new Date();
    const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const generateCols = (length: number) => {
        const cols = new Array(length).fill("5%");
        cols[0] = "3%";
        cols[1] = "30%";

        return cols;
    };

    // headerTitle 개수만큼 table col 개수 정해주기
    const cols = generateCols(headerTitle.length);
    const colgroupElements = cols.map((colWidth, index) => <col key={index} width={colWidth} />);

    return (
        <>
            <Header />
            <Container>
                <RecordHeader selectedSeasonCallback={selectedSeasonCallback} />
                <Todaydiv>※{date} 기준</Todaydiv>
                <Table>
                    <colgroup>
                        {colgroupElements}
                    </colgroup>
                    <Thead>
                        <tr>
                            {headerTitle}
                        </tr>
                    </Thead>
                    <Tbody>{tbodyData}</Tbody>
                </Table>
            </Container>
        </>
    );
}

export default RecordPage;

const Container = styled.div`
    position: relative;
    padding: 0 162px 30px 162px;
`

const Todaydiv = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;
    text-align: right;
`

const Table = styled.table`
    width: 100%;
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
