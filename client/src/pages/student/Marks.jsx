import React, { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { fetchResponse } from "../../api/service";
import { studentEndpoints } from "../../api/endpoints/studentEndpoints";
import { toastErrorObject } from "../../utility/toasts";
import { toast } from "react-toastify";
import DynamicTable from "../../components/tables/DynamicTable";
import ActivityCard from "../../components/cards/ActivityCard";
import SelectField from "../../components/inputs/SelectField";

export default function Marks() {
  const studentId = JSON.parse(localStorage.getItem("student"))._id;

  const [marksData, setMarksData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [examTypesState, setExamTypesState] = useState(null);

  useEffect(() => {
    async function fetchCourseAndExamTypeNames() {
      try {
        let res;
        res = await fetchResponse(
          studentEndpoints.getCourseAndExamTypeNames(studentId),
          0,
          null
        );
        const resData = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          return;
        }
        console.log("Log data", resData);
        setCourses(resData?.courses);
        setExamTypes(resData?.examTypes);
        setExamTypesState(
          resData.examTypes?.reduce((acc, examType) => {
            acc[examType] = false;
            return acc;
          }, {})
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchCourseAndExamTypeNames();
  }, [studentId]);

  async function handleFetchAcademics(examType) {
    setIsLoading(true);
    try {
      let res;
      res = await fetchResponse(
        studentEndpoints.getAcademics(studentId, selectedCourse, examType),
        0,
        null
      );
      const resData = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        return;
      }
      console.log("Log data", resData);
      const sortedMarksData = resData?.sort((a, b) => {
        return a.activityNumber - b.activityNumber;
      });
      setMarksData((prevMarksData) => ({
        ...prevMarksData,
        [examType]: sortedMarksData,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <StudentLayout isLoading={isLoading}>
        <SelectField
          label={"Course | Instructor"}
          options={courses?.map((course) => ({
            title: course.title + " | " + course.instructor,
            value: course.courseId,
          }))}
          value={selectedCourse}
          onChange={(event) => {
            setSelectedCourse(event.target.value);
            setMarksData([]);
            setExamTypesState((prevExamTypesData) =>
              Object.keys(prevExamTypesData).map(
                (examType) => (prevExamTypesData[examType] = false)
              )
            );
          }}
        />
        <div className="pt-3">
          {examTypes?.map((examType, index) => {
            return (
              <div className="py-1" key={index}>
                <ActivityCard
                  header={examType}
                  isExpanded={examTypesState[examType]}
                  handleExpanded={() => {
                    if (!examTypesState[examType]) {
                      if (!selectedCourse) {
                        toast.warning(
                          "Please select a Course.",
                          toastErrorObject
                        );
                        return;
                      }
                      handleFetchAcademics(examType);
                    }
                    setExamTypesState({
                      ...examTypesState,
                      [examType]: !examTypesState[examType],
                    });
                  }}
                >
                  <DynamicTable
                    styles={"table-bordered"}
                    headers={[
                      "Activity Number",
                      "Weightage",
                      "Total Marks",
                      "Obtained Marks",
                    ]}
                    data={marksData ? marksData[examType] : []}
                    dataAttributes={[
                      "activityNumber",
                      "weightage",
                      "totalMarks",
                      "marks",
                    ]}
                  />
                </ActivityCard>
              </div>
            );
          })}
        </div>
      </StudentLayout>
    </>
  );
}
