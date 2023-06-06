import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AccountBox, AccountIntro } from "./login";
import "./../styles/login.css";

import Button from "./../components/common/Button/Button";
import Input from "./../components/common/Input";
import userData from "./userData"; //임시데이터

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favorite, setFavorite] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: any) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // 이메일 형식을 확인하는 정규식. 영어만 가능
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(enteredEmail)) {
      setErrorMessage("올바른 이메일을 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleAvatarChange = (selectedImage: Image) => {
    setAvatar(selectedImage.fullImageUrl);
  };

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value || "0";
    setFavorite(selectedValue);
  };

  const handleRegister = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호를 다시 확인해주세요.");
      return;
    }

    // 이메일 중복 체크
    const emailExists = userData.some((user) => user.email === email);
    if (emailExists) {
      setErrorMessage("이미 등록된 이메일입니다.");
      return;
    }

    // 필수 정보 입력 여부 체크
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      favorite === "" ||
      nickname === "" ||
      phone === "" ||
      avatar === ""
    ) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    // 회원가입 성공
    console.log("회원가입 성공");
    alert("회원가입이 완료되었습니다. 환영합니다!");
    console.log("이메일:", email);
    console.log("비밀번호:", password);
    console.log("선호종목:", favorite);
    console.log("닉네임:", nickname);
    console.log("핸드폰:", phone);
    console.log("프로필 아바타:", avatar);

    // 기존 회원 정보를 불러옴
    const existingUsers = localStorage.getItem("users");
    const parsedExistingUsers = existingUsers ? JSON.parse(existingUsers) : [];
    // 새로운 회원 정보를 추가
    const user = {
      email,
      password,
      favorite,
      nickname,
      phone,
      avatar,
    };
    const updatedUsers = [...parsedExistingUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // // 회원가입 정보를 로컬 스토리지에 저장(덮어쓰기 저장)
    // const user = {
    //   email,
    //   password,
    //   favorite,
    //   nickname,
    //   phone,
    //   avatar,
    // };
    // localStorage.setItem("user", JSON.stringify(user));
    

    navigate("/login");
  };

  return (
    <section>
      <AccountBox login="join">
        <AccountIntro />
        <div className="accountForm">
          <h2 className="title">회원가입</h2>
          <StyledArticle>
            <ul>
              <li>
                {/* 이메일 입력 */}
                <p className="inputField">이메일</p>
                {/* <Input type="email" value={email} onChange={handleEmailChange} /> */}
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {errorMessage && errorMessage.includes("이메일") && (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                )}
              </li>
              <li>
                {/* 비밀번호 입력 */}
                <p className="inputField">비밀번호</p>
                {/* <Input type="password" value={password} onChange={handlePasswordChange} /> */}
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </li>
              {/* 비밀번호 확인 입력 */}
              <li>
                <p className="inputField">비밀번호 확인</p>
                {/* <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} /> */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {errorMessage && errorMessage.includes("비밀번호") && (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                )}
              </li>
              <li>
                {/* 선호종목 입력 */}
                <p className="inputField">선호종목</p>
                <select value={favorite} onChange={handleFavoriteChange}>
                  <option value="">선호 종목을 선택하세요</option>
                  <option value="0">축구</option>
                  <option value="1">야구</option>
                  <option value="2">롤</option>
                </select>
              </li>
            </ul>
            <ul>
              <li>
                {/* 닉네임 입력 */}
                <p className="inputField">닉네임</p>
                {/* <Input type="text" value={nickname} onChange={handleNicknameChange}/> */}
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </li>
              <li>
                {/* 핸드폰 입력 */}
                <p className="inputField">핸드폰</p>
                {/* <Input type="text" value={phone} onChange={handlePhoneChange} /> */}
                <input type="text" value={phone} onChange={handlePhoneChange} />
              </li>
              <li>
                {/* 프로필 아바타 입력 */}
                <p className="inputField">프로필아바타</p>
                <Gallery onAvatarChange={handleAvatarChange} />
              </li>
            </ul>
          </StyledArticle>
          <Button
            disabled={false}
            purpose="base"
            content="회원가입"
            onClick={handleRegister}
          />
          <p className="goJoin">
            이미 회원이세요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </AccountBox>
    </section>
  );
};

//입력폼 스타일드 컴포넌트
const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;

  & > ul {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;

    li {
      position: relative;
      margin-bottom: 25px;
    }

    li:last-child {
      margin-bottom: 0;
    }

    p.inputField {
      color: #28293d;
      margin-bottom: 5px;
    }

    input {
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid rgb(199, 201, 217);
      border-radius: 4px;
      width: 100%;
      width: calc(100% - 1px);
      box-sizing: border-box;
    }

    select {
      width: 100%;
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid rgb(199, 201, 217);
      border-radius: 4px;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  left: 5px;
`;

//프로필 사진 선택 관련
interface Image {
  id: number;
  thumbnailUrl: string;
  fullImageUrl: string;
  altText: string;
}

interface GalleryProps {
  onAvatarChange: (selectedImage: Image) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onAvatarChange }) => {
  const thumbnailImages: Image[] = [
    {
      id: 1,
      thumbnailUrl: "/images/profile1.png",
      fullImageUrl: "/images/profile1.png",
      altText: "Image 1",
    },
    {
      id: 2,
      thumbnailUrl: "/images/profile2.png",
      fullImageUrl: "/images/profile2.png",
      altText: "Image 2",
    },
    {
      id: 3,
      thumbnailUrl: "/images/profile3.png",
      fullImageUrl: "/images/profile3.png",
      altText: "Image 3",
    },
    {
      id: 4,
      thumbnailUrl: "/images/profile4.png",
      fullImageUrl: "/images/profile4.png",
      altText: "Image 4",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<Image | null>(
    thumbnailImages[0]
  );

  const handleThumbnailClick = (image: Image) => {
    setSelectedImage(image);
    onAvatarChange(image);
  };

  return (
    <div className="profileSelect">
      <div className="mainImage">
        <img
          src={
            selectedImage
              ? selectedImage.fullImageUrl
              : thumbnailImages[0].fullImageUrl
          }
          alt={
            selectedImage ? selectedImage.altText : thumbnailImages[0].altText
          }
        />
      </div>
      <div className="thumbnails">
        {thumbnailImages.map((image: Image) => (
          <img
            key={image.id}
            src={image.thumbnailUrl}
            alt={image.altText}
            style={{
              border: `2px solid ${
                selectedImage && selectedImage.id === image.id
                  ? "#5F30E2"
                  : "#fff"
              }`,
            }}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinPage;
