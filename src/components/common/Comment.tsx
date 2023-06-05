import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Avatar from "@mui/material/Avatar";

interface CommentProps {
  alt: string,
  img : string,
  nickname : string;
  info : string;
  date : string;

  userId : number;
  //댓글 get 할때 불러오는  comment 테이블에서 user_id 사용
  localSaveUserId: number;
  //로그인시 저장 userId 로컬스토리지에 저장되게 수빈님에게 말씀드리기!!
}

const Comment:React.FC<CommentProps> = ({ alt, img, nickname, info, date, localSaveUserId, userId }) => {

  return(
    <StyledComment>
      <div className="commentCon">
        <Avatar
          alt={alt}
          src={img}
          sx={{ width: 34, height: 34 }}
        />
        <section className="commentArea">
          <h3>{ nickname }</h3>
          <p>{ info }</p>
        </section>
        <p className="commentDate">{ date }</p>
        {/*유정님이 고치신 onclick이벤트 부분 pull 받고 진행 찬규님 한테 버튼 디자인 다양하게 만들수 있게 변경 요청*/}
        <Button 
          content={
            userId === localSaveUserId ? "삭제하기" : "신고하기"
          }
          purpose="base"
          disabled={false}
        />
      </div>
    </StyledComment>
  );
}

export default Comment;


const StyledComment = styled.section`
  background: #FBFAFE;
  width: 100%;
  height: auto;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #323338;
  
  div.commentCon{
    display: flex;
    align-items: center;
    padding: 0 30px;
  }
  div.commentCon section.commentArea{
    padding: 20px  0 20px 22px;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  div.commentCon section.commentArea p{
    margin: 5px 0px 0px;
    word-break: keep-all;
  }
  div.commentCon p.commentDate{
    margin: 0 22px 0;
    white-space: nowrap;
    text-align: center;
  }
  button{
    background: initial;
    border: 0;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
  }
`