import React from "react";
import DynamicNavbar from "../components/navbars/DynamicNavbar";

export default function HomeLayout({ children }) {
  return (
    <>
      <DynamicNavbar options={[]} />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "91vh" }}
      >
        {children}
      </div>
    </>
  );
}
