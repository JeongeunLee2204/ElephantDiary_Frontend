import { useEffect, useState } from "react";
import axios from "axios";
import ListBlock from "../components/listBlock";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

interface Diary {
  id: number;
  title: string;
  summary: string;
  date: string;
  score: string;
}

interface User {
  userId: string;
  email: string;
  name: string;
}

function List() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        console.error("로그인 정보 없음");
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${user.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDiaries(res.data);
      })
      .catch((err) => {
        console.error("일기 불러오기 실패:", err);
      });
  }, [user]);

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`,
        {
          withCredentials: true,
        }
      );
      setDiaries((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          {user ? `${user.name}님의 일기 목록` : "로그인이 필요합니다"}
        </h2>

        {diaries.length > 0 ? (
          <div className="space-y-4">
            {diaries.map((diary) => (
              <ListBlock
                key={diary.id}
                title={diary.title}
                summary={diary.summary}
                date={new Date(diary.date)}
                score={diary.score}
                onClick={() => navigate(`/diary/${diary.id}`)}
                update={() => navigate(`/diary/${diary.id}/edit`)}
                delete={() => handleDelete(diary.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center bg-white rounded-lg shadow p-6">
            아직 작성한 일기가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default List;
