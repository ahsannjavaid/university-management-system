import React, { useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { fetchResponse } from '../../../api/service';
import { courseEndpoints } from '../../../api/endpoints/courseEndpoints';
import { toast } from 'react-toastify';
import { toastErrorObject, toastSuccessObject } from '../../../utility/toasts';
import LoadingSpinner from '../../../components/spinners/LoadingSpinner';
import GeneralCard from '../../../components/cards/GeneralCard';
import CourseRegisterForm from '../../../components/forms/CourseRegisterForm';

export default function RegisterCourse() {
  const adminId = JSON.parse(localStorage.getItem("admin"))._id;

  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    title: "",
    code: "",
    type: "",
    fee: "",
    creditHours: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegisteration(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        courseEndpoints.registerCourse(),
        1,
        {...signupDetails, adminId}
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      toast.success(res.message, toastSuccessObject);
      console.log("Log data", data);
      navigate("/admin/courses/action");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "81vh" }}
      >
        <GeneralCard header={"Course Registration"}>
          <CourseRegisterForm
            registrationDetails={signupDetails}
            setRegistrationDetails={setSignupDetails}
            registration={handleRegisteration}
          />
        </GeneralCard>
      </div>
    </AdminLayout>
  )
}
