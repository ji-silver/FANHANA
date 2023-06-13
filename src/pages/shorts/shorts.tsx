import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

import Image from "../../components/common/Image";
import ArrowButton from "../../components/common/Button/ArrowButton";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";
import Comment from "../../components/common/Comment";

// interface CurShorts {
//   id: number;
//   title: string;
//   views: number;
//   src: string;
//   // 카테고리가 어떤 값으로 오는지 한번 더 체크
//   category: number;
// }

// Comment 컴포넌트의 타입과 완전히 같은데 불러오는 방법 찾아보기???
// interface CommentType {
//   alt: string;
//   img: string;
//   nickname: string;
//   info: string;
//   date: string;
//   userId: number;
// }

// 서버에 데이터를 받아올 때 이미 존재하는 id이면 다시 받아오도록
const Shorts: React.FC = () => {
  // 이전 페이지에서 category 값을 uri로 전달받아서 어디 카테고리에서 온 건지, shortsId가 있는지 확인해 데이터를 불러온다.
  const location = useLocation();
  const preCategory = location.state?.category;
  const preShortsId = location.state?.shortsId;

  const localSaveUserId = localStorage.getItem("userId");
  const parsedUserId = localSaveUserId ? parseInt(localSaveUserId) : null;

  const [curShorts, setCurShorts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [shortsList, setShortsList] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 쇼츠를 불러오는 함수
  const getShorts = async (shorts_id: number = 15, category: number = 2) => {
    // 지금은 고정 값이지만 페이지가 바뀌면서 새로운 값을 받도록
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/shorts/detail`,
        {
          params: {
            shorts_id,
            category,
          },
        }
      );
      const shorts = response.data.data;

      setShortsList((pre) => [...pre, shorts.id]);
      setCurShorts(shorts);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  // shortsId에 해당하는 댓글을 가져오는 함수
  const getComments = async (shortsId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/comment/list/${shortsId}`,
        {
          params: {
            contents_category: 0,
          },
        }
      );
      const comments = response.data.data;

      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 이전 쇼츠를 가져오는 함수
  const preShorts = () => {
    setShortsList((prev) => {
      const updatedShortsList = [...prev];
      updatedShortsList.pop(); // 가장 마지막 값 제거
      const previousShortsId = updatedShortsList[updatedShortsList.length - 1]; // 이전 쇼츠의 id

      getShorts(previousShortsId, preCategory); // 이전 쇼츠 가져오기

      return updatedShortsList;
    });
  };

  // 다음 쇼츠를 가져오는 함수
  const nextShorts = () => {
    getShorts(undefined, preCategory);
  };

  // input 핸들러
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  // 신고냐 삭제냐 로직
  const handle = () => {
    // 현재 이벤트가 속한 댓글의 value가 "신고하기"냐 "삭제하기" 냐에 따라 다른 로직 수행
  };

  // 버튼을 클릭하면 input 값을 가지고 댓글 등록하는 로직 작성
  const handleComment = async () => {
    try {
      if (!curShorts) {
        // curShorts가 null인 경우 에러 처리
        throw new Error("No current shorts available");
      }

      const token = localStorage.getItem("accessToken");

      const requestBody = {
        contents_category: 0,
        id: curShorts.id,
        content: input,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:5500/api/v1/comment/`,
        requestBody,
        config
      );

      setInput("");

      getComments(curShorts.id);
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    getShorts(preShortsId, preCategory);

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (curShorts) {
      getComments(curShorts.id);
    }

    setLoading(false);
  }, [curShorts]);

  return (
    <ShortsContainer>
      <ArrowButton rotate={180} onClick={preShorts}></ArrowButton>
      <StyledShort>
        {loading ? ( // Render "Loading..." when loading state is true
          <p>Loading...</p>
        ) : (
          curShorts && (
            <ImageCover>
              <Image src={curShorts.src} alt={"쇼츠입니다."}></Image>

              <ShortsButton onClick={() => setModalOpen(true)}>
                <CommentsButton />
              </ShortsButton>
            </ImageCover>
          )
        )}
      </StyledShort>

      {modalOpen && ( // 모달 창이 열려있을 때에만 Modal 컴포넌트를 렌더링합니다.
        <Modal onClick={() => setModalOpen(false)}>
          <CommentCover>
            {comments &&
              comments.map((comment, index) => (
                <Comment
                  key={index}
                  alt={comment.nickname}
                  img={comment.img}
                  nickname={comment.nickname}
                  info={comment.content}
                  date={comment.date}
                  localSaveUserId={parsedUserId}
                  userId={comment.userId}
                  clickHandler={handle}
                />
              ))}
          </CommentCover>
        </Modal>
      )}

      <StyledComment>
        <CommentsHeader>
          <CommentsTitle>댓글</CommentsTitle>
          <CommentsCount>{comments.length}</CommentsCount>
        </CommentsHeader>
        <CommentCover>
          {/* 닫는 버튼(이건 크기에 따라 달라졌을 때 추가되는 걸로) */}
          {comments.map((comment, index) => (
            <Comment
              key={index}
              alt={comment.nickname}
              img={comment.img}
              nickname={comment.nickname}
              info={comment.content}
              date={comment.date}
              localSaveUserId={parsedUserId}
              userId={comment.userId}
              clickHandler={handle}
            />
          ))}
          {/* 댓글들
          // 댓글 => 전달받은 댓글 갯수만큼 댓글 컴포넌트에 담아 작성
        */}
        </CommentCover>
        <InputCover>
          <InputContainer>
            <Input value={input} onChange={handleInputChange} />
          </InputContainer>
          <ButtonContainer>
            <Button
              disabled={false}
              purpose="base"
              content="댓글"
              onClick={handleComment}
            ></Button>
          </ButtonContainer>
        </InputCover>
      </StyledComment>
      <ArrowButton rotate={0} onClick={nextShorts}></ArrowButton>
    </ShortsContainer>
  );
};

export default Shorts;

const ShortsContainer = styled.main`
  display: flex;
  margin: 30px 162px 30px 162px;
  align-items: center;
  justify-content: center;
`;

const StyledShort = styled.div``;

const StyledComment = styled.div`
  width: 450px;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #efeafc;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: opacity 0.3s, width 0.3s, height 0.3s;

  @media (max-width: 1400px) {
    opacity: 0;
    width: 0;
  }

  @media (min-width: 1400px) {
    opacity: 1;
    width: 450px;
  }

  @media (min-width: 2000px) {
    width: 754px;
    height: 1340px;
  }
`;

const ImageCover = styled.div`
  position: relative;
  width: 360px;
  height: 640px;
  background-color: black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: width 0.3s, height 0.3s;

  @media (max-width: 1400px) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  @media (min-width: 2000px) {
    width: 754px;
    height: 1340px;
  }
`;

const CommentCover = styled.div`
  flex-grow: 20;
  width: 90%;
  overflow: auto;
`;

const CommentsHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: end;
  flex-grow: 1;
  margin-bottom: 10px;
`;

const CommentsTitle = styled.p`
  font-size: 20px;
  margin-right: 10px;
`;

const CommentsCount = styled.p`
  font-size: 16px;
`;

const InputCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 50px;
`;

const ShortsButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  background-color: #efeafc;
  border: 1px solid black;
  border-radius: 50%;

  @media (min-width: 1400px) {
    display: none;
  }
`;

const Modal = styled.div`
  width: 360px;
  height: 640px;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1000;
  overflow: auto;
  background: rgba(0, 0, 0, 0.6);
`;

const CommentsButton = styled(BsFillChatLeftDotsFill)``;
