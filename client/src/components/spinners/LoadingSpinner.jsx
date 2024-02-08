import React from "react";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "9999",
        backgroundColor: "rgba(255,255,255,0.4)",
      }}
    >
      <div className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
