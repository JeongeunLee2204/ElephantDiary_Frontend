import React from "react";

interface ListBlockProps {
  title: string;
  summary: string;
  date: Date;
  score: string;
  onClick: () => void;
  update: () => void;
  delete: () => void;
}

const ListBlock: React.FC<ListBlockProps> = (props) => {
  const { title, summary, date, score, onClick, update } = props;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        margin: "10px",
        padding: "14px",
        width: "80%",
        textAlign: "left",
        borderRadius: "8px",
        backgroundColor: "#f7f7f7",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          color: "#111",
          fontWeight: 700,
          fontSize: "17px",
          marginBottom: "4px",
        }}
      >
        {title}
      </div>

      <div style={{ color: "#555", marginBottom: "6px" }}>{score}점</div>
      <div style={{ color: "#555", marginBottom: "8px" }}>{summary}</div>

      <div style={{ fontSize: "12px", color: "#888" }}>
        {date.toLocaleDateString()}
      </div>

      <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            update();
          }}
          style={{
            padding: "4px 10px",
            fontSize: "12px",
            lineHeight: 1.2,
            borderRadius: "6px",
            border: "1px solid #aaa",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          수정
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            props.delete(); // 예약어 충돌 회피
          }}
          style={{
            padding: "4px 10px",
            fontSize: "12px",
            lineHeight: 1.2,
            borderRadius: "6px",
            border: "1px solid #c33",
            backgroundColor: "#fff",
            color: "#c33",
            cursor: "pointer",
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ListBlock;
