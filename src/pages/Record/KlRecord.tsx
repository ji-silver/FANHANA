import React from 'react'
import styled from "styled-components";
import RecordTable from './RecordTable';
import Header from '../../components/common/Header';


function KlRecord() {

    const data = [
        {
            "team": "울산",
            "wins": 12,
            "drawns": 2,
            "losses": 1,
            "scored": 32,
            "conceded": 16,
            "points": 28
        },
        {
            "team": "서울",
            "wins": 10,
            "drawns": 4,
            "losses": 1,
            "scored": 28,
            "conceded": 12,
            "points": 24
        },
        {
            "team": "전북",
            "wins": 11,
            "drawns": 3,
            "losses": 1,
            "scored": 30,
            "conceded": 14,
            "points": 26
        }
    ]

    // 승점 높은순으로 정렬
    data.sort((a, b) => b.points - a.points);

    const headers = ['순위', '팀', '경기', '승', "무", '패', '득점', '실점', '득실차', '승점'];

    const datas = (
        <>

            {data.map((teamData, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{teamData.team}</td>
                    <td>{teamData.wins + teamData.drawns + teamData.losses}</td>
                    <td>{teamData.wins}</td>
                    <td>{teamData.drawns}</td>
                    <td>{teamData.losses}</td>
                    <td>{teamData.scored}</td>
                    <td>{teamData.conceded}</td>
                    <td>{teamData.scored - teamData.conceded}</td>
                    <td>{teamData.points}</td>
                </tr>
            ))}
        </>
    );
    return (
        <div>
            <Header />
            <RecordTable headerData={headers} tbodyData={datas} />

        </div>
    )
}

export default KlRecord;