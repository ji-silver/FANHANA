import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Image from "../components/common/Image";
import ArrowButton from "../components/common/Button/ArrowButton";

interface Comment {
  id: string;
  content: string;
  image: string;
}

interface ImageDate {
  id: string;
  url: string;
}

// 최초의 이미지를 어떤걸로 설정할 것인가?
const Shorts: React.FC = () => {
  const [curImage, setCurImage] = useState<ImageDate | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // image에 해당하는 댓글을 가져오는 함수
  const getComments = async (imageId: string) => {
    try {
      const response = await axios.get(`/api/comments/${imageId}`);
      const comments = response.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 이전 이미지 가져오는 함수
  const preImage = () => {};
  // 다음 이미지 가져오는 함수
  const nextImage = () => {};

  useEffect(() => {
    // curImage가 존재하면 현재 이미지의 id를 넘긴다.
    if (curImage) {
      getComments(curImage.id);
    }
  }, [curImage]);

  return (
    <ShortsContainer>
      <StyledShort>
        <ArrowButton rotate={true} onClick={preImage}></ArrowButton>
        <ImageCover>
          <Image src={curImage.url} alt={"이미지입니다."}></Image>
        </ImageCover>
        <ArrowButton onClick={nextImage}></ArrowButton>
      </StyledShort>
      <StyledComment>
        <CommentCover>
          {/* 댓글제목 콘테이너 */}
          {/* 댓글 제목 */}
          {/* 댓글 수 : 댓글 수를 알려면 comments의 길이를... comments.length*/}
          {/* 닫는 버튼(이건 크기에 따라 달라졌을 때 추가되는 걸로) */}
          {comments.map((comment) => (
            <Comment key={comment.id}>{comment.content}</Comment>
          ))}
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
  margin: 0 162px 30px 162px;
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
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
`;
