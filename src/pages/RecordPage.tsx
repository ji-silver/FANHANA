import React, { ReactNode, FC, useState } from 'react'
import styled from "styled-components";
import Header from '../components/common/Header/Header';

interface RecordTableProps {
    season: string,
    headerTitle: ReactNode[];
    tbodyData: ReactNode;
    modal: ReactNode;
};

const RecordPage: FC<RecordTableProps> = ({ season, headerTitle, tbodyData, modal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    };

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
                <SeasonSelect>
                    <SelectBox onClick={handleClick}>
                        <span>
                            {season}
                        </span>
                        <DropdownIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="7"
                                fill="none"
                                viewBox="0 0 12 7"
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M12 .762a.738.738 0 01-.223.536L6.527 6.63A.715.715 0 016 6.857a.715.715 0 01-.527-.226L.223 1.298A.738.738 0 010 .762C0 .556.074.377.223.226A.715.715 0 01.75 0h10.5c.203 0 .379.075.527.226.149.151.223.33.223.536z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </DropdownIcon>
                    </SelectBox>
                </SeasonSelect>
                {isModalOpen && <>{modal}</>}
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

const SeasonSelect = styled.div`
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    &:hover {
        color: #5546B7;
    }
`

const DropdownIcon = styled.span`
    display: flex;
    padding-left: 5px;
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
