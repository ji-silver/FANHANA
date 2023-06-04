import React, { useState } from "react";
import "./../styles/login.css";
import styled from "styled-components";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "./../components/common/Input";
import Button from "./../components/common/Button";

interface AccountBox {
  login: string;
}

export let AccountBox = styled.div<AccountBox>`
  width: ${(props) => (props.login === "login" ? "950px" : "1250px")};
  height: 600px;
  display: flex;
  left: ${(props) =>
    props.login === "login" ? "calc(50% - 475px)" : "calc(50% - 625px)"};
  box-sizing: border-box;
  box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  position: absolute;
  top: calc(50% - 300px);
`;

// 미구현
// 나중에 api완성되면 연결하기
// 디자인 추가!!!

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  
  const handleLogin = () => {
    axios
      .post("api/v1/auth/login", { email, password })
      .then((response) => {
        if (response.data.success) {
          console.log("로그인 되었습니다.");
        } else {
          alert("존재하지 않는 계정 또는 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
      });
  };
//   const isValidEmail = (email: string) => {
//     //이메일 유효성 검사
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

  return (
    <section>
      <AccountBox login="login">
        <AccountIntro />
        <div className="accountForm">
          <h2 className="title">로그인</h2>
          {/* ==== 로그인 비밀번호 영역 컴포넌트 완성 후 수정 필요 ==== */}
          <article>
            <p>이메일</p>
            <Input value={email} onChange={handleEmailChange} />
            <p>비밀번호</p>
            <Input value={password} onChange={handlePasswordChange} />
          </article>
          <Button disabled={false} purpose="base" content="로그인"
            // @ts-ignore
            onClick={handleLogin} as="button" style={{ width: "100%", marginTop: "20px" }}/>
          <p className="goJoin">
            아직 회원이 아니세요?
            <Link to="/join">회원가입</Link>
          </p>
        </div>
      </AccountBox>
    </section>
  );
};

//로그인 회원가입 왼쪽

export function AccountIntro() {
  return (
    <div className="accountIntro">
      <img
        className="logo"
        src="https://via.placeholder.com/200"
        alt="임시이미지"
      ></img>
      <p className="siteName">팬하나</p>
      <p className="grey">진정한 스포츠 팬들을 위한 커뮤니티</p>
      <p>
        팬하나에 오신것을 환영합니다.
        <br />
        다양한 소식과 경기 결과를 한눈에 보실 수 있는 팬하나!
        <br />
        로그인 하시면 더 많은 기능을 이용하실 수 있습니다.
      </p>
    </div>
  );
}
export default LoginPage;
