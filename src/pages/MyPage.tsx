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

  useEffect(() => {
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

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50 text-gray-700">
        로딩 중...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
            마이페이지
          </h2>
          <img
            src={user.picture}
            alt="프로필"
            className="w-28 h-28 rounded-full mx-auto mb-6 shadow"
          />
          <p className="text-lg text-gray-700 mb-2">닉네임: {user.name}</p>
          <p className="text-lg text-gray-700 mb-6">이메일: {user.email}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
