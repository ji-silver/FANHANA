import React from 'react'
import styles from '../../styles/Record.module.scss'
import useRank from '../../hooks/useRank';
import RecordPage from '../../pages/RecordPage';

const KboRecord = () => {
    const { reFetch, data } = useRank();

    // 선택한 시즌에 대한 데이터 불러오기
    const handleSeasonChange = (newSeason: string): void => {
        reFetch(newSeason);
    }

    // 테이블 헤더 데이터
    const teamHeaders = ['순위', '팀'];
    const dataHeaders = ['경기', '승', '무', '패', '승률', '게임차'];

    const teamHeaderElements = teamHeaders.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''}`}
        >
            {header}
        </th>
    ));

    const dataHeaderElements = dataHeaders.map((header, index) => (
        <th
            key={index + teamHeaders.length}
            className={`${styles.tableHeader} ${index === 4 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

    const headers = [...teamHeaderElements, ...dataHeaderElements];

    // 야구는 승률로 정렬 (승률이 같으면 상대전적으로 정렬해야하지만 상대전적 데이터 x)
    const sortedData = [...data].sort((a, b) => {
        const winRateA = a.wins / (a.wins + a.losses);
        const winRateB = b.wins / (b.wins + b.losses);
        return winRateB - winRateA;
    });

    //테이블 속성 데이터
    const datas = (
        <>
            {sortedData.map((team, index) => {
                const { team_name, wins, drawns, losses, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 승률 계산 (무승부 포함 x)
                const winRate = (wins / (wins + losses)).toFixed(3);
                // 게임차 계산
                const gameBehind = index === 0 ? '0.0' : (((sortedData[0].wins - wins) + (losses - sortedData[0].losses)) / 2).toFixed(1);

                return (
                    <tr key={team_name}>
                        <td className={styles.rank}>{rank}</td>
                        <td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{team_name}</span></td>
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

    const teamDatas = sortedData.map((team, index) => {
        const { team_name, img } = team;
        const teamNameSplit = team_name.split(' ')[0];

        return (
            <tr key={index}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{teamNameSplit}</span></td>
            </tr>
        );
    });

    return (
        <div>
            <RecordPage headerTitle={headers} teamHeaderElements={teamHeaderElements} tbodyData={datas} teamDatas={teamDatas} selectedSeasonCallback={handleSeasonChange} />
        </div>
    )
}

export default KboRecord;
