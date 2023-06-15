import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Schedule } from "../../pages/SchedulePage";
import "../../styles/map.css";

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

interface Props {
  scheduleList: Schedule[];
}

const CATEGORY: { [key: number]: string } = {
  0: "soccer",
  1: "baseball",
  2: "lol",
};

const KakaoMap = (props: Props) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.546493, 127.065942),
      level: 4, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  useEffect(() => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();
    const bounds = new kakao.maps.LatLngBounds();

    const placesSearchCB = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // data -> 정확도 순으로 정렬된 장소 목록
        bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
      }
    };

    props.scheduleList.forEach((schedule) => {
      let location = schedule.location;
      if (schedule.category === 0) {
        if (location.includes("종합")) {
          location += "운동장";
        } else location += "축구장";
      }
      if (schedule.category === 1) {
        location += "야구장";
      }

      ps.keywordSearch(location, (result: any, status: any) => {
        placesSearchCB(result, status);
        display(result[0], schedule);
      });
    });

    // 마커를 생성하고 지도 위에 마커를 표시, 커스텀 오버레이를 생성하는 함수
    const display = (place: any, schedule: Schedule) => {
      const category = CATEGORY[schedule.category];
      const markerImageSrc = `/images/marker_${category}.png`;
      const imageSize = new kakao.maps.Size(45, 45);
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 클릭 시 해당 장소로 지도 중심 이동
        const pos = marker.getPosition();
        map.setLevel(3, { animation: true, anchor: pos });
      });

      const content = `
        <div class="overlayContainer">
          <div class="overlayTitle">${place.place_name}</div>
        </div>
      `;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: content,
      });

      customOverlay.setMap(map);
    };
  }, [map, props.scheduleList]);

  return <Map id="map"></Map>;
};

export default KakaoMap;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const CustomOverlay = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;
