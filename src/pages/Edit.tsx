import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";

interface DiaryDetail {
  id: number;
  title: string | null;
  content: string | null;
  date: string | null; // ISO 'YYYY-MM-DD'
  score: number | null; // 숫자로 관리
}

// 빈 문자열을 null로 치환
const nilIfEmpty = (v: string | null | undefined) =>
  v === "" || v === undefined ? null : v;

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
      .then((res) => {
        const d = res.data as DiaryDetail;

        // 서버에서 null이 올 수 있으니, 화면용으로 안전하게 정규화
        setForm({
          ...d,
          title: d.title ?? "",
          content: d.content ?? "",
          date: d.date ?? "",
          // score는 number|null로 보관. 문자열로 왔으면 숫자로 바꿈
          score:
            typeof (d as any).score === "string"
              ? Number.isNaN(Number((d as any).score))
                ? null
                : Number((d as any).score)
              : (d as any).score ?? null,
        });
      })
      .catch((err) => {
        console.error("상세 조회 실패:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "일기를 불러올 수 없습니다.";
        alert(msg);
        navigate("/mypage");
      });
  }, [id, navigate]);

  const onChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const raw = e.target.value;
    // 빈 칸이면 null, 아니면 숫자. 숫자 아니면 무시(또는 null)
    if (raw === "") {
      setForm({ ...form, score: null });
    } else {
      const num = Number(raw);
      setForm({ ...form, score: Number.isNaN(num) ? null : num });
    }
  };

  const onSave = async () => {
    if (!form || saving) return;
    setSaving(true);
    try {
      // 전송 전에 빈 문자열은 null로 치환, score는 number|null 유지
      const payload = {
        title: nilIfEmpty(form.title as any),
        content: nilIfEmpty(form.content as any),
        date: nilIfEmpty(form.date as any), // 'YYYY-MM-DD'
        score: form.score, // number|null
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/diary/${id}`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("수정 완료");
      navigate("/mypage");
    } catch (err: any) {
      console.error("수정 실패:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "수정 중 오류가 발생했습니다.";
      alert(msg);
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
            value={form.title ?? ""} // null 방지
            onChange={onChangeText}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            본문
          </label>
          <textarea
            name="content"
            value={form.content ?? ""} // null 방지
            onChange={onChangeText}
            className="w-full border rounded-md px-3 py-2 h-40 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              날짜
            </label>
            <input
              type="date" // 날짜 입력 보조
              name="date"
              value={form.date ?? ""} // 'YYYY-MM-DD'
              onChange={onChangeText}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              점수
            </label>
            <input
              type="number" // 숫자 입력 보조
              name="score"
              value={form.score ?? ""} // number|null -> ''로 표시
              onChange={onChangeScore}
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
