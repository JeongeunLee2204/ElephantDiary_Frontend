import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        margin: "10px",
        padding: "10px 16px",
        fontSize: "16px",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
