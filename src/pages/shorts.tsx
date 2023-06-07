import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Image from "../components/common/Image";
import ArrowButton from "../components/common/Button/ArrowButton";
import Input from "../components/common/Input";
import Button from "../components/common/Button/Button";

interface CurShorts {
  id: string;
  title: string;
  hits: number;
  url: string;
}

interface Comment {
  id: string;
  content: string;
  image: string;
}

const Shorts: React.FC = () => {
  const [curShorts, setCurShorts] = useState<CurShorts | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState();
  const [input, setInput] = useState("");

  // 쇼츠 불러오는 함수
  const getShorts = async (category?: string) => {
    try {
      const response = await axios.get(
        `/api/v1/shorts?category=${
          category ? encodeURIComponent(category) : null
        }`
      );
      const shorts = response.data;
      setCurShorts(shorts);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  // image에 해당하는 댓글을 가져오는 함수
  const getComments = async (shortsId: string) => {
    try {
      // ?shorts의 id는 어떻게 받을 것인가? query? 아니면 path?
      const response = await axios.get(`/api/comments/${shortsId}`);
      const comments = response.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 이전 쇼츠를 가져오는 함수
  const preImage = () => {};
  // 다음 쇼츠를 가져오는 함수
  const nextImage = () => {};

  // input 핸들러
  const handleInputChange = (value: string) => {
    setInput(value);
  };
  // 버튼을 클릭하면 input 값을 가지고 댓글 등록하는 로직 작성
  const handleComment = async () => {
    try {
      if (!curShorts) {
        // curShorts가 null인 경우 에러 처리
        throw new Error("No current shorts available");
      }

      const response = await axios.post(`api/v1/comment`, {
        content_category: "",
        id: curShorts.id,
        content: input,
      });
      const responseData = response.data;
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  useEffect(() => {
    // curImage가 존재하면 현재 이미지의 id를 넘긴다.
    if (curShorts) {
      getComments(curShorts.id);
    } else {
      const urlParams = new URLSearchParams(window.location.search);

      const category = urlParams.get("category");

      if (category) {
        getShorts(category);
      } else {
        getShorts();
      }
    }
  }, [curShorts]);

  return (
    <ShortsContainer>
      <StyledShort>
        <ArrowButton rotate={true}></ArrowButton>
        <ImageCover>
          <Image
            src={
              "https://images.unsplash.com/photo-1682686578023-dc680e7a3aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
            }
            // src={curShorts.url}
            alt={"쇼츠입니다."}
          ></Image>
        </ImageCover>
        <ArrowButton></ArrowButton>
      </StyledShort>
      <StyledComment>
        <TitleCover>
          <CommentsTitle>댓글</CommentsTitle>
          <CommentsCount>3{commentsCount}</CommentsCount>
        </TitleCover>
        <CommentCover>
          {/* 닫는 버튼(이건 크기에 따라 달라졌을 때 추가되는 걸로) */}
          {/* {comments.map((comment) => (
            <Comment key={comment.id}>{comment.content}</Comment>
          ))} */}
          {/* 댓글들
          // 댓글 => 전달받은 댓글 갯수만큼 댓글 컴포넌트에 담아 작성
        */}
        </CommentCover>
        <InputCover>
          <InputContainer>
            <Input value={input} onChange={handleInputChange} />
          </InputContainer>
          <ButtonContainer>
            <Button disabled={false} purpose="base" content="댓글"></Button>
          </ButtonContainer>
        </InputCover>
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

const TitleCover = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: end;
  flex-grow: 1;
`;

const CommentsTitle = styled.p`
  font-size: 20px;
  margin-right: 10px;
`;

const CommentsCount = styled.p`
  font-size: 16px;
`;

const CommentCover = styled.div`
  flex-grow: 20;
`;

const StyledShort = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledComment = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
`;

const InputCover = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
