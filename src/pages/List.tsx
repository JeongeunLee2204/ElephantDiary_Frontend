import { useEffect, useState } from "react";
import axios from "axios";
import ListBlock from "../components/listBlock";
import Navbar from "../components/navbar";
interface Diary {
  id: number;
  title: string;
  summary: string;
  date: string;
}

interface User {
  userId: string;
  email: string;
  name: string;
}

function List() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div>
      <Navbar />
      <h2>{user ? `${user.name}님의 일기 목록` : "로그인 필요"}</h2>
      {diaries.length > 0 ? (
        diaries.map((diary) => (
          <ListBlock
            key={diary.id}
            title={diary.title}
            summary={diary.summary}
            date={new Date(diary.date)}
            onClick={() => {
              console.log(`${diary.id}번 일기 클릭됨`);
            }}
          />
        ))
      ) : (
        <p>아직 작성한 일기가 없습니다.</p>
      )}
    </div>
  );
}

export default List;
