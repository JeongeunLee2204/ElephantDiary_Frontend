import React from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const toMypage = () => navigate("/mypage");
  const toDiary = () => navigate("/write");
  const toList = () => navigate("/list");

  const handleLogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.error("로그아웃 실패", err));
  };

  return (
    <>
      <Button label="마이페이지" onClick={toMypage} />
      <Button label="일기 쓰기" onClick={toDiary} />
      <Button label="일기 리스트" onClick={toList} />
      <Button label="로그아웃" onClick={handleLogout} />
    </>
  );
};

export default Navbar;
