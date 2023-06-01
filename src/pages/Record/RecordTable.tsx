import React, { ReactNode } from 'react'
import styled from "styled-components";

const Container = styled.div`
    font-size: 14px;
    max-width: 1596px;
    margin: 0 auto;
`

const Table = styled.table`
    width: 100%;
    text-align: center;
`

const Thead = styled.thead`
    height: 44px;
    background-color: #f7f7f7;
    font-weight: bold;

    th {
        vertical-align: middle;
    }
`

type RecordTableProps = {
    headerData: string[];
    tbodyData: ReactNode;
};

function RecordTable({ headerData, tbodyData }: RecordTableProps) {
    return (
        <Container>
            <Table>
                <colgroup>
                    <col></col>
                </colgroup>
                <Thead>
                    <tr>
                        {headerData.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </Thead>
                <tbody>{tbodyData}</tbody>
            </Table>
        </Container>
    );
}

export default RecordTable;