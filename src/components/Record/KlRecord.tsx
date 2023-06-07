import React, { useState, useEffect } from 'react'
import styles from '../../styles/Record.module.scss'
import rankData from './rankData.json';
import teamData from './teamData.json';
import RecordPage from '../../pages/RecordPage';
import useRank from '../../hooks/useRank';

const KlRecord = () => {
    // const {defaultSeason, seasons, reFetch, teamData } = useRank(selectedSeason);
    const { data } = useRank(teamData, rankData);
    const [season, setSeason] = useState<string>('');
    const [seasons, setSeasons] = useState<string[]>([]);
    const [selectedSeason, setSelectedSeason] = useState("");

    const handleSeasonChange = (newSeason: string): void => {
        setSelectedSeason(newSeason);
        // reFetch();
    }

    // 시즌 중복 안되게 새 배열로 반환 후 첫번째 데이터 기본으로 선택
    useEffect(() => {
        if (data.length > 0) {
            const seasons = Array.from(new Set(data.map(item => item.season)));
            setSeason(seasons[0]);
            setSeasons(seasons);
        }
    }, [data]);

    const headers = ['순위', '팀', '경기', '승', '무', '패', '득점', '실점', '득실차', '승점'];
    const headerElements = headers.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''} ${index === 9 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));


    // 축구는 승점 높은순으로 정렬
    const sortedData = [...data].sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        } else {
            // 승점이 같은 경우 다득점 정렬
            return b.scored - a.scored;
        }
    });

    const datas = (
        <>
            {sortedData.map((team, index) => {
                const { name, wins, drawns, losses, scored, conceded, points, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 득실차 계산
                const goalDifference = scored - conceded;
                return (
                    <tr key={name}>
                        <td className={styles.rank}>{rank}</td>
                        <td className={styles.team}><img className={styles.teamImg} src={img} alt="" /><span>{name}</span></td>
                        <td>{totalGames}</td>
                        <td>{wins}</td>
                        <td>{drawns}</td>
                        <td>{losses}</td>
                        <td>{scored}</td>
                        <td>{conceded}</td>
                        <td>{goalDifference}</td>
                        <td className={styles.selected}>{points}</td>
                    </tr>
                );
            })}
        </>
    );
    useEffect(() => {
        console.log(selectedSeason)
    }, [selectedSeason])

    return (
        <div>
            <RecordPage headerTitle={headerElements} tbodyData={datas} seasons={seasons} firstSeason={season} selectedSeasonCallback={handleSeasonChange} />
        </div>
    )
}

export default KlRecord;