// src/pages/View.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";

interface DiaryDetail {
  id: number;
  title: string | null;
  content: string | null;
  date: string | null; // ISO 'YYYY-MM-DD'
  score: number | null; // 숫자
}

// 동일 도메인 배포면 비워둬도 됨
const BASE = import.meta.env.VITE_API_BASE_URL || "";

function View() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<DiaryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      alert("잘못된 접근입니다.");
      navigate("/list");
      return;
    }

    const url = `${BASE}/api/diary/id/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        const d = res.data as DiaryDetail;
        // 화면 표시용 정규화 (null 방지)
        setForm({
          ...d,
          title: d.title ?? "",
          content: d.content ?? "",
          date: d.date ?? "",
          score:
            typeof (d as any).score === "string"
              ? Number.isNaN(Number((d as any).score))
                ? null
                : Number((d as any).score)
              : (d as any).score ?? null,
        });
      })
      .catch((err) => {
        const status = err?.response?.status;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "일기를 불러올 수 없습니다.";
        console.error("상세 조회 실패:", { status, msg, url });
        alert(
          status === 404
            ? "해당 일기를 찾을 수 없습니다."
            : status === 403
            ? "이 일기에 접근할 권한이 없습니다."
            : `일기를 불러올 수 없습니다. (status=${status ?? "N/A"})`
        );
        navigate("/list");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-blue-50 text-gray-800">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">일기 보기</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            name="title"
            value={form.title ?? ""}
            readOnly
            aria-readonly="true"
            className="w-full border rounded-md px-3 py-2 bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            본문
          </label>
          <textarea
            name="content"
            value={form.content ?? ""}
            readOnly
            aria-readonly="true"
            className="w-full border rounded-md px-3 py-2 h-40 resize-y bg-gray-50 text-gray-800 focus:outline-none"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              날짜
            </label>
            <input
              type="date"
              name="date"
              value={form.date ?? ""}
              readOnly
              disabled // date 입력은 readOnly만으로는 막기 어려워 disabled 병행
              className="w-full border rounded-md px-3 py-2 bg-gray-50 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              점수
            </label>
            <input
              type="number"
              name="score"
              value={form.score ?? ""}
              readOnly
              aria-readonly="true"
              className="w-full border rounded-md px-3 py-2 bg-gray-50 text-gray-800"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/diary/${id}/edit`)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            수정하기
          </button>
          <button
            onClick={() => navigate("/list")}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
