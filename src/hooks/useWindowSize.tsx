import { useState, useEffect } from 'react';

// 현재 윈도우의 너비와 높이를 객체로 반환하는 커스텀 훅
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        // resize이벤트(브라우저 창 크기 변경)가 발생할 때마다 handleResize 호출
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;