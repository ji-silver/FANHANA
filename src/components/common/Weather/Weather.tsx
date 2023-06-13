import React, { useState, useEffect } from "react";
import { weatherDescKo } from './WeatherDesc';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;

type WeatherProps = {
    height: string;
}

interface WeatherState {
    description: string | null;
    name: string | null;
    temp: number | null;
    icon: string | null;
};

const Weather: React.FC<WeatherProps> = ({ height }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<WeatherState>({
        description: 'null',
        name: null,
        temp: null,
        icon: null
    });


    // 위치정보(위도, 경도) 가져오기
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeather(lat, lon);
        });
    }, []);

    const getWeather = async (lat: number, lon: number) => {
        try {
            // 날씨 가져오는 거 오래 걸려서 로딩 표시
            setIsLoading(true);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

            // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
            const weatherId = res.data.weather[0].id;
            const weatherKo = (weatherDescKo as any)[weatherId];
            // 날씨 아이콘 가져오기
            const weatherIcon = res.data.weather[0].icon;
            const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            // city 대문자
            const cityName = res.data.name.split('-')[0].toUpperCase();
            // 소수점 버리기
            const temp = Math.round(res.data.main.temp);

            setWeather({
                description: weatherKo,
                name: cityName,
                temp: temp,
                icon: weatherIconAdrs
            });

            setIsLoading(false);
        } catch (err) {
            setError('날씨 정보를 가져올 수 없습니다.');
            setIsLoading(false);
            console.error(err);
        }
    };


    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeekIndex = currentDate.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    const today = `${month}월 ${day}일 ${dayOfWeek}요일`;

    return (
        <React.Fragment>
            <Container fixed>
                <Box
                    sx={{
                        background: 'linear-gradient(to left, #7474BF, #348AC7)',
                        height: height,
                        borderRadius: '20px',
                    }}
                >
                    <WeatherContainer>
                        <WeatherWrap>
                            {isLoading ? (
                                <p>날씨 정보를 불러오는 중입니다!</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <>
                                    <Today>{today}</Today>
                                    <City>
                                        <Icon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 12"
                                            >
                                                <path
                                                    fill="#fff"
                                                    d="M8.485 8.485L4.971 12 1.456 8.485a4.97 4.97 0 117.03 0zM4.971 7.18a2.21 2.21 0 100-4.418 2.21 2.21 0 000 4.418zm0-1.105a1.105 1.105 0 110-2.209 1.105 1.105 0 010 2.21z"
                                                ></path>
                                            </svg>
                                        </Icon>
                                        {weather.name}
                                    </City>
                                    {weather.icon && <img src={weather.icon} alt="Weather Icon" />}
                                    <Temp>{weather.temp}°</Temp>
                                    <Description>{weather.description}</Description>
                                </>
                            )}
                        </WeatherWrap>
                    </WeatherContainer>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Weather;

const WeatherContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  color: white;
`;

const WeatherWrap = styled.div`
  margin: 0 auto;
`;

const Today = styled.p`
`

const City = styled.h2`
    font-size: 1.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Temp = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
`

const Description = styled.p`

`

const Icon = styled.div`
    width: 15px;
    height: auto;
    padding-right: 10px;
`