import React from "react";
import { Link } from "react-router-dom";

export default function HomeCard({ image, alt, text, path }) {
  return (
    <Link to={path} className="card bg-dark shadow border-2 border-secondary" style={{ width: "18rem", margin: "30px", borderRadius: "20px" }}>
      <img src={image} className="card-img" alt={alt} style={{ borderRadius: "18px" }} />
      <div className="card-img-overlay">
        <h5 className="card-title shadow-sm bg-white text-secondary ps-3 py-1 fw-bold" style={{ borderRadius: "20px", marginRight: "80px" }}>{text}</h5>
      </div>
    </Link>
  );
}
