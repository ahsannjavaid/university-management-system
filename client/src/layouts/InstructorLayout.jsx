import React from "react";
import DynamicNavbar from "../components/navbars/DynamicNavbar";
import { useAuth } from "../contexts/authContext";

export default function InstructorLayout({ children }) {
  const { setInstructorData } = useAuth();

  return (
    <>
      <DynamicNavbar
        options={[
          {
            title: "Home",
            path: "/instructor",
          },
          {
            title: "Students",
            path: "/instructor/students",
          },
          {
            title: "Marks",
            path: "/instructor/marks",
          },
          {
            title: "Attendance",
            path: "/instructor/attendance",
          },
          {
            title: "Courses",
            path: "/instructor/courses",
          },
          {
            title: "Settings",
            path: "/instructor/settings",
          },
        ]}
        functionalItem={{
          title: "Logout",
          function: () => {
            setInstructorData(null);
            localStorage.removeItem("instructor");
          },
        }}
      />
      <div className="container mt-4">{children}</div>
    </>
  );
}
