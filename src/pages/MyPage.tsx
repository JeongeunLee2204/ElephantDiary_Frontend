import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

const MyPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  //console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  useEffect(() => {
    //console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("유저 정보 불러오기 실패", err));
  }, []);

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

  if (!user) return <div>로딩 중...</div>;

  return (
    <div>
      <Navbar />
      <h2>마이페이지</h2>
      <p>닉네임: {user.name}</p>
      <p>이메일: {user.email}</p>
      <img
        src={user.picture}
        alt="프로필"
        style={{ width: "100px", borderRadius: "50%" }}
      />
      <br />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
