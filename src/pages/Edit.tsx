import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";

interface DiaryDetail {
  id: number;
  title: string;
  content: string;
  date: string;
  score: string;
}

function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<DiaryDetail | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`, {
        withCredentials: true,
      })
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error("상세 조회 실패:", err);
        alert("일기를 불러올 수 없습니다.");
        navigate("/mypage");
      });
  }, [id, navigate]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSave = async () => {
    if (!form || saving) return;
    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`,
        {
          title: form.title,
          content: form.content,
          date: form.date,
          score: form.score,
        },
        { withCredentials: true }
      );
      alert("수정 완료");
      navigate("/mypage");
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
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
        <h2 className="text-2xl font-bold mb-6 text-blue-600">일기 수정</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            본문
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2 h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              날짜
            </label>
            <input
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              점수
            </label>
            <input
              name="score"
              value={form.score}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            저장
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
