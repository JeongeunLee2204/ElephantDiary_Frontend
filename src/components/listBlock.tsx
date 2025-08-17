import React from "react";

interface ListBlockProps {
  title: string;
  summary: string;
  date: Date;
  score: string;
  onClick: () => void;
}

const ListBlock: React.FC<ListBlockProps> = ({
  title,
  summary,
  date,
  score,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        margin: "10px",
        padding: "16px",
        width: "80%",
        textAlign: "left",
        borderRadius: "8px",
        backgroundColor: "#f2f2f2",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      <div style={{ color: "#555", marginBottom: "8px" }}>{score}점</div>
      <div style={{ color: "#555", marginBottom: "8px" }}>{summary}</div>
      <div style={{ fontSize: "12px", color: "#888" }}>
        {date.toLocaleDateString()}
      </div>
    </button>
  );
};

export default ListBlock;
