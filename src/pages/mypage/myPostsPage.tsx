import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdown from "./../../components/common/Dropdown";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5500";

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const parseJwt = (token: any) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const decodedToken = JSON.parse(jsonPayload);
      return decodedToken;
    } catch (error) {
      console.log("토큰 역파싱 실패", error);
      return null;
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredPosts = response.data.data.filter(
        (post: any) => post.user_id === getUserIdFromToken()
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error("게시글 가져오기 실패:", error);
    }
  };

  const getUserIdFromToken = () => {
    const decodedToken = parseJwt(token);
    return decodedToken?.user_id;
  };

  const getCategoryLabel = (category: any) => {
    if (category === 0) {
      console.log("축구선택");
      return "축구";
    } else if (category === 1) {
      console.log("야구 선택");
      return "야구";
    } else if (category === 2) {
      console.log("롤 선택");
      return "롤";
    } else if (category === 4 || category === "4") {
      console.log("아무것도 선택안함");
      return "전체";
    }
  };

  const handleDropdownSelect = (selectedItem: any) => {
    setSelectedCategory(selectedItem === 4 ? null : selectedItem);
  };

  const filterPosts = () => {
    if (selectedCategory === null) {
      return posts;
    } else {
      return posts.filter((post: any) => post.category === parseInt(selectedCategory));
    }
  };

  return (
    <div className="mh500">
      <div style={{display:"flex", alignItems:"center", marginBottom:"20px"}}>
        <h2 className="pageTitle" style={{marginRight:"auto"}}>작성글 보기</h2>
        <Dropdown
          allCategory={true}
          purpose="small"
          dropdownSelect={handleDropdownSelect}
        />
      </div>
      {posts.length > 0 ? (
        <table style={{ width: "100%", color: "#333" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E3E3E3" }}>
              <th style={{width:"80px"}}>번호</th>
              <th style={{width:"80px"}}>분류</th>
              <th>제목</th>
              <th style={{width:"120px"}}>작성일</th>
              <th style={{width:"80px"}}>조회수</th>
            </tr>
          </thead>
          <tbody>
            {filterPosts().map((post: any) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{getCategoryLabel(post.category)}</td>
                <td style={{textAlign:"left"}}>
                  <Link to={`http://localhost:5500/api/v1/post/${post.id}`}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.created_at}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
