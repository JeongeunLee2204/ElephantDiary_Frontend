import { useState } from "react";
import Button from "../components/button";
import axios from "axios";
import Navbar from "../components/navbar";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(""); // 문자열로 관리 후 전송 시 숫자 변환

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
        alert("저장 완료");
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
    <div>
      <Navbar />
      <h2>일기 쓰기</h2>

      <div>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          style={{ width: 300, marginBottom: 10 }}
        />
      </div>

      <div>
        <label>내용:</label>
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          cols={50}
          placeholder="오늘의 공부 내용을 입력하세요"
        />
      </div>

      <div>
        <label>점수:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="점수를 입력하세요"
          style={{ width: 300, marginBottom: 10 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <Button label="저장" onClick={postDiary} />
        <Button label="초기화" onClick={reset} />
      </div>
    </div>
  );
}

export default Write;
