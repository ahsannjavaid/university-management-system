import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [instructorData, setInstructorData] = useState(
    JSON.parse(localStorage.getItem("instructor"))
  );
  const [studentData, setStudentData] = useState(
    JSON.parse(localStorage.getItem("student"))
  );
  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  console.log("instructorData", instructorData);
  console.log("studentData", studentData);
  console.log("adminData", adminData);

  return (
    <authContext.Provider
      value={{
        instructorData,
        setInstructorData,
        studentData,
        setStudentData,
        adminData,
        setAdminData,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
