import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

/**
 * 나중에 api 통신하는 걸로 변경
 * api/v1/team/:category -> 종목 별 팀 조회
 * api/v1/rank/:category -> 종목 별 시즌 조회 후
 * api/v1/rank/:category/:season -> 시즌 별 팀 순위 조회
 * 
 */

interface Team {
    _id: string;
    name: string;
    category: number;
    img: string;
}

interface Rank {
    team_id: string;
    season: string;
    wins: number;
    drawns: number;
    losses: number;
    scored: number;
    conceded: number;
    points: number;
}

const useRank = (teamData: Team[], rankData: Rank[]) => {
    const [data, setData] = useState<(Team & Rank)[]>([]);
    const [category, setCategory] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split("/")[1];
        if (path === 'soccer') setCategory(0);
        else if (path === 'baseball') setCategory(1);
        else if (path === 'esport') setCategory(2);
        else setCategory(0);
    }, [location]);

    useEffect(() => {
        const combinedData: (Team & Rank)[] = teamData.map((team: Team) => {
            const rank = rankData.find((rank: Rank) => rank.team_id === team._id);
            return {
                ...team,
                ...rank,
                team_id: rank?.team_id || '',
                season: rank?.season || '',
                wins: rank?.wins || 0,
                drawns: rank?.drawns || 0,
                losses: rank?.losses || 0,
                scored: rank?.scored || 0,
                conceded: rank?.conceded || 0,
                points: rank?.points || 0,
            };
        });

        // 해당 카테고리와 일치하는 데이터만 필터링
        const filteredData = combinedData.filter((item) => item.category === category);
        setData(filteredData);
    }, [teamData, rankData, category]);

    return { data };
};

// const useRank = (selectedSeason?: string) => {
//     const [category, setCategory] = useState('')
//     const [firstSeason, setFirstSeason] = useState('');
//     const [teamData, setTeamData] = useState<Team[]>([]);
//     const [rankData, setRankData] = useState<Rank[]>([]);
//     const [data, setData] = useState<(Team & Rank)[]>();

//     const location = useLocation();
//     const url = process.env.REACT_APP_API_BASE_URL;

//     useEffect(() => {
//         const path = location.pathname.split("/")[1];
//         if (path === 'soccer') setCategory('0');
//         else if (path === 'baseball') setCategory('1');
//         else if (path === 'esport') setCategory('2');
//         else setCategory('');
//     }, [location]);


//     // 처음엔 카테고리에 따라 팀데이터를 가져오고, 시즌 데이터는 제일 첫번째가 기본
//     useEffect(() => {
//         const fetchSeasonData = async () => {
//             try {
//                 const res = await axios.get(`${url}/rank/${category}`);
//                 setFirstSeason(res.data[0]);
//             } catch (err) {
//                 console.error(err)
//             }
//         };

//         const fetchTeamData = async () => {
//             try {
//                 const res = await axios.get(`${url}/team/${category}`);
//                 setTeamData(res.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchSeasonData();
//         fetchTeamData();
//     }, [category]); // 카테고리 변경될 때 마다 실행


//     // 해당 시즌에 따라 순위 데이터 가져오기
//     useEffect(() => {
//         const fetchRankData = async () => {
//             try {
//                 const res = await axios.get(`${url}/rank/${category}/${firstSeason}`);
//                 setRankData(res.data);
//             } catch (err) {
//                 console.error(err)
//             }
//         }
//         // 시즌을 받아올 때만 실행
//         if (firstSeason) {
//             fetchRankData();
//         }
//     }, [firstSeason, category, url]); // 시즌과 카테고리 변경될 때 마다 실행


//     // 모달창에서 시즌을 선택하면 그 시즌에 해당하는 순위데이터 가져오기
//     const reFetch = async () => {
//         try {
//             const res = await axios.get(`${url}/rank/${category}/${selectedSeason}`);
//             setRankData(res.data);
//         } catch (err) {
//             console.error(err)
//         }
//     };

//     // rank.team_id === team._id 같은지 비교하고 서로 매핑하기
//     useEffect(() => {
//         const data: (Team & Rank)[] = teamData.map((team: Team) => {
//             const rank = rankData.find((rank: Rank) => rank.team_id === team._id);
//             return {
//                 ...team,
//                 ...rank,
//                 team_id: rank?.team_id || '',
//                 season: rank?.season || '',
//                 wins: rank?.wins || 0,
//                 drawns: rank?.drawns || 0,
//                 losses: rank?.losses || 0,
//                 scored: rank?.scored || 0,
//                 conceded: rank?.conceded || 0,
//                 points: rank?.points || 0,
//             };
//         });
//         setData(data);
//     }, [teamData, rankData]);
//     return { firstSeason, reFetch, data };
// }

export default useRank
