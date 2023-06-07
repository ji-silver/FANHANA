import React, { useEffect, useState } from 'react'
import styles from '../../styles/Record.module.scss'
import useRank from '../../hooks/useRank';
import rankData from './rankData.json';
import teamData from './teamData.json';
import RecordPage from '../../pages/RecordPage';

const KboRecord = () => {
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

    // 테이블 헤더 데이터
    const headers = ['순위', '팀', '경기', '승', '무', '패', '승률', '게임차'];
    const headerElements = headers.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''} ${index === 6 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

    // 야구는 승률로 정렬 (승률이 같으면 상대전적으로 정렬해야하지만 상대전적 데이터 x)
    const sortedData = [...filteredData].sort((a, b) => {
        const winRateA = a.wins / (a.wins + a.losses);
        const winRateB = b.wins / (b.wins + b.losses);
        return winRateB - winRateA;
    });

    //테이블 속성 데이터
    const datas = (
        <>
            {sortedData.map((team, index) => {
                const { name, wins, drawns, losses, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 승률 계산 (무승부 포함 x)
                const winRate = (wins / (wins + losses)).toFixed(3);
                // 게임차 계산
                const gameBehind = index === 0 ? '0.0' : (((sortedData[0].wins - sortedData[0].losses) - (wins - losses)) / 2).toFixed(1);

                return (
                    <tr key={name}>
                        <td className={styles.rank}>{rank}</td>
                        <td className={styles.team}><img className={styles.teamImg} src={img} alt="" /><span>{name}</span></td>
                        <td>{totalGames}</td>
                        <td>{wins}</td>
                        <td>{drawns}</td>
                        <td>{losses}</td>
                        <td className={styles.selected}>{winRate}</td>
                        <td>{gameBehind}</td>
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

export default KboRecord;
