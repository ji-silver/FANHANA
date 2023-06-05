import styled from "styled-components";
import React from "react";
import Image from "../components/common/Image";

const Shorts: React.FC = () => {
  // url을 받아온다
  // 받아온 url을 가지고 이미지를 보여준다
  // 이미지와 연결된 댓글을 보여준다
  // 이미지 양 옆에는 다른 이미지를 랜덤하게 보여주는 화살표 버튼이 있다.
  // 새로운 이미지는 이미 받아온 데이터로 할 것인가? 아니면 버튼을 누를 때 마다 새로운 이미지로?
  // 크기가 작아져서 두 페이지가 한번에 들어가기 힘들면 댓글은 모달로 구현
  return (
    <ShortsContainer>
      <StyledShort>
        <button>a</button>
        <ImageCover>
          <Image
            src={"https://placekitten.com/300/200"}
            alt={"이미지입니다."}
          ></Image>
        </ImageCover>
        <button>a</button>
      </StyledShort>
      <StyledComment>
        <CommentCover>
          {/* 댓글제목 콘테이너
          // 댓글 제목
          // 댓글 수
          // 닫는 버튼(이건 크기에 따라 달라졌을 때 추가되는 걸로)
        */}
          {/* 댓글들
          // 댓글 => 전달받은 댓글 갯수만큼 댓글 컴포넌트에 담아 작성
        */}
        </CommentCover>
      </StyledComment>
    </ShortsContainer>
  );
};

export default Shorts;

const ShortsContainer = styled.main`
  display: flex;
  margin: 5% 162px;
`;

const ImageCover = styled.div`
  width: 360px;
  height: 640px;
`;

const CommentCover = styled.div``;

const StyledShort = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledComment = styled.div`
  background-color: red;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
