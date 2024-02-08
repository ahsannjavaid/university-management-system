import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext';
import { fetchResponse } from '../../api/service';
import { studentEndpoints } from '../../api/endpoints/studentEndpoints';
import { toastErrorObject, toastSuccessObject } from '../../utility/toasts';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/spinners/LoadingSpinner';
import StudentLayout from '../../layouts/StudentLayout';
import GeneralCard from '../../components/cards/GeneralCard';
import SignupForm from '../../components/forms/SignupForm';

export default function StudentSettings() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const { studentData, setStudentData } = useAuth();

  const [studentDetails, setStudentDetails] = useState({
    fname: studentData?.fname,
    lname: studentData?.lname,
    email: studentData?.email,
    password: studentData?.password,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        studentEndpoints.editStudent(studentId),
        2,
        studentDetails
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);

      // state update
      let updatedData = {
        ...studentData,
        fname: studentDetails.fname,
        lname: studentDetails.lname,
        email: studentDetails.email,
        password: studentDetails.password,
      }
      setStudentData(updatedData);
      localStorage.setItem("student", JSON.stringify(updatedData));
      console.log("Log data", data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <StudentLayout>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "81vh" }}
      >
        <GeneralCard header={"Edit Information"}>
          <SignupForm
            signupDetails={studentDetails}
            setSignupDetails={setStudentDetails}
            signup={handleUpdate}
            update={true}
          />
        </GeneralCard>
      </div>
    </StudentLayout>
  );
}
