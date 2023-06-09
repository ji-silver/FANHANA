import React, { useState, useEffect } from "react";
import axios from "axios";

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    phone: "",
    favoriteSport: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/v1/user/1");
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      console.log("불러오기 실패 왜 안나오냐고라ㅓㄹ아ㅓ랑런ㄹㄴ아ㅓ", error);
    }
  };

  const handleNicknameChange = (e:any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      nickname: e.target.value,
    }));
  };

  const handlePhoneChange = (e:any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      phone: e.target.value,
    }));
  };

  const handleFavoriteSportChange = (e:any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      favoriteSport: e.target.value,
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // 정보수정
      await axios.put("http://localhost:5500/api/v1/user/1", userInfo);
      console.log("수정", userInfo);
    } catch (error) {
      console.log("수정실패", error);
    }

    setEditing(false);
  };

  return (
    <div>
      <h2>유저정보</h2>
      <table style={{textAlign: "left"}}>
        <tbody>
          <tr>
            <th>이메일</th>
            <td>{userInfo.email} : 이게 이메일 근데 왜 안나오냐고</td>
          </tr>
          <tr>
            <th>닉네임</th>
            <td>
              {editing ? (
                <input
                  type="text"
                  value={userInfo.nickname}
                  onChange={handleNicknameChange}
                />
              ) : (
                userInfo.nickname
              )}
            </td>
          </tr>
          <tr>
            <th>핸드폰</th>
            <td>
              {editing ? (
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={handlePhoneChange}
                />
              ) : (
                userInfo.phone
              )}
            </td>
          </tr>
          <tr>
            <th>선호종목</th>
            <td>
              {editing ? (
                <select
                  value={userInfo.favoriteSport}
                  onChange={handleFavoriteSportChange}
                >
                  <option value="">선호 종목을 선택하세요</option>
                  <option value="0">축구</option>
                  <option value="1">야구</option>
                  <option value="2">롤</option>
                </select>
              ) : (
                userInfo.favoriteSport
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {editing ? (
        <button onClick={handleSaveClick}>저장</button>
      ) : (
        <button onClick={handleEditClick}>수정</button>
      )}
    </div>
  );
};

export default MyInfo;
