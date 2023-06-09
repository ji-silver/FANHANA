import React, { useState } from "react";

const MyInfo = () => {
  // 사용자 정보를 가져올 때 로컬스토리지에서 읽어온다고 가정합니다.
  const userInfoFromLocalStorage = {
    email: "user@example.com",
    nickname: "JohnDoe",
    phone: "010-1234-5678",
    favoriteSport: "Football",
  };

  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(userInfoFromLocalStorage.nickname);
  const [phone, setPhone] = useState(userInfoFromLocalStorage.phone);
  const [favoriteSport, setFavoriteSport] = useState(
    userInfoFromLocalStorage.favoriteSport
  );

  const handleNicknameChange = (e:any) => {
    setNickname(e.target.value);
  };

  const handlePhoneChange = (e:any) => {
    setPhone(e.target.value);
  };

  const handleFavoriteSportChange = (e:any) => {
    setFavoriteSport(e.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // 여기서는 간단히 콘솔에 업데이트된 정보를 출력합니다.
    console.log("Updated User Info:", {
      nickname,
      phone,
      favoriteSport,
    });
    // 실제로는 서버로 업데이트 요청을 보낼 수 있습니다.

    setEditing(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <td>{userInfoFromLocalStorage.email}</td>
          </tr>
          <tr>
            <th>Nickname</th>
            <td>
              {editing ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              ) : (
                nickname
              )}
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>
              {editing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              ) : (
                phone
              )}
            </td>
          </tr>
          <tr>
            <th>Favorite Sport</th>
            <td>
              {editing ? (
                <select
                  value={favoriteSport}
                  onChange={handleFavoriteSportChange}
                >
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Baseball">Baseball</option>
                </select>
              ) : (
                favoriteSport
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {editing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default MyInfo;
