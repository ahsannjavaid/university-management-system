import React from "react";

export default function GeneralCard({ header, children }) {
  return (
    <div
      className="card shadow mx-auto"
      style={{
        pointerEvents: "auto",
        borderRadius: "20px",
        width: "25rem",
      }}
    >
      <div
        className="card-header text-center"
        style={{
          borderRadius: "20px 20px 0 0",
        }}
      >
        {header}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
