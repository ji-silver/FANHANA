import React, { useState, useEffect } from 'react'
import styles from '../../styles/Record.module.scss'
import rankData from './rankData.json';
import teamData from './teamData.json';
import RecordPage from '../../pages/RecordPage';
import useRank from '../../hooks/useRank';

const LoLRecord = () => {
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

    const filteredData = data.filter(item => item.season === season);

    const headers = ['순위', '팀', '승', '패', '득실차', '승률'];
    const headerElements = headers.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''} ${index === 2 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

    // 롤 승률로 정렬
    const sortedData = [...filteredData].sort((a, b) => {
        const winRateA = a.wins / (a.wins + a.losses);
        const winRateB = b.wins / (b.wins + b.losses);
        if (winRateA !== winRateB) {
            return winRateB - winRateA;
        } else {
            // 승률이 같은 경우 득실차로 정렬
            const scoreDifferenceA = a.scored - a.conceded;
            const scoreDifferenceB = b.scored - b.conceded;
            return scoreDifferenceB - scoreDifferenceA;
        }
    });

    const datas = (
        <>
            {sortedData.map((team, index) => {
                const { name, wins, losses, scored, conceded, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 득실차 계산
                const scoreDifference = scored - conceded;
                // 총 게임수
                const totalGames = wins + losses;
                // 승률 계산
                const winRate = (wins / totalGames).toFixed(2);

                return (
                    <tr key={name}>
                        <td className={styles.rank}>{rank}</td>
                        <td className={styles.team}><img className={styles.teamImg} src={img} alt="" /><span>{name}</span></td>
                        <td className={styles.selected}>{wins}</td>
                        <td>{losses}</td>
                        <td>{scoreDifference}</td>
                        <td>{winRate}</td>
                    </tr>
                );
            })}
        </>
    );
    return (
        <div>
            <RecordPage headerTitle={headerElements} tbodyData={datas} seasons={seasons} firstSeason={season} selectedSeasonCallback={handleSeasonChange} />
        </div>
    )
}

export default LoLRecord;