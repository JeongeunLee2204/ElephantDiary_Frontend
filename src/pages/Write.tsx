import { useState } from "react";
import Button from "../components/button";
import axios from "axios";
import Navbar from "../components/navbar";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState("");

  const postDiary = () => {
    const scoreNum = score === "" ? null : Number(score);
    if (score !== "" && Number.isNaN(scoreNum)) {
      alert("점수는 숫자로 입력해 주세요");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/diary`,
        {
          title,
          content,
          score: scoreNum,
          date: new Date().toISOString().slice(0, 10),
        },
        { withCredentials: true }
      )
      .then(() => {
        window.location.href = "/mypage";
      })
      .catch((err) => console.error("일기 저장 실패", err));
  };

  const reset = () => {
    setTitle("");
    setContent("");
    setScore("");
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8">
            일기 쓰기
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              className="w-full sm:max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              className="w-full h-56 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              cols={50}
              placeholder="오늘의 공부 내용을 입력하세요"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              점수
            </label>
            <input
              className="w-full sm:max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="점수를 입력하세요"
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button label="저장" onClick={postDiary} />
            <Button label="초기화" onClick={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
