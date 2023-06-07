import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Team {
    _id: string,
    name: string,
    category: number,
    img: string
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


// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const useRank = (selectedSeason?: string) => {
//     const url = BASE_URL;
//     const location = useLocation();

//     const [category, setCategory] = useState('');
//     const [seasons, SetSeasons] = useState([]);
//     const [defaultSeason, setDefaultSeason] = useState('');
//     const [teamData, setTeamData] = useState<Team[]>([]);

//     useEffect(() => {
//         const path = location.pathname.split("/")[1];
//         if (path === 'soccer') setCategory('0');
//         else if (path === 'baseball') setCategory('1');
//         else if (path === 'esport') setCategory('2');
//         else setCategory('');
//     }, [location]);


//     // 시즌 첫번째 데이터를 기본으로 순위 데이터 가져오기
//     useEffect(() => {
//         const fetchSeasonData = async () => {
//             try {
//                 const res = await axios.get(`${url}/rank/${category}`);
//                 SetSeasons(res.data)
//                 setDefaultSeason(res.data[0]);

//                 const rankRes = await axios.get(`${url}/rank/${category}/${res.data[0]}`);
//                 setTeamData(rankRes.data);

//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchSeasonData();
//     }, [category]); // 카테고리 변경 시 실행


//     // 모달창에서 시즌을 선택하면 그 시즌에 해당하는 순위데이터 가져오기
//     const reFetch = async () => {
//         try {
//             const res = await axios.get(`${url}/rank/${category}/${selectedSeason}`);
//             setTeamData(res.data);
//         } catch (err) {
//             console.error(err)
//         }
//     };
//     return { defaultSeason, seasons, reFetch, teamData };
// }

export default useRank
