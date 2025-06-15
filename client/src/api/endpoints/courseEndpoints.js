// import { BASE_URL } from "../config";

const title = "course/";

export const courseEndpoints = {
  registerCourse: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getCourses: () => `${process.env.REACT_APP_API_URL}${title}getAll`,

  getStudentsOfInstructor: (id) => `${process.env.REACT_APP_API_URL}${title}registeredStudents/getAll/${id}`,

  offerCourse: () => `${process.env.REACT_APP_API_URL}${title}offered/register/`,

  getCoursesOfInstructor: (id) => `${process.env.REACT_APP_API_URL}${title}offered/getAll/${id}`,

  getCoursesOfStudent: (id) => `${process.env.REACT_APP_API_URL}${title}registered/getAll/${id}`,

  getOfferedCourses: () => `${process.env.REACT_APP_API_URL}${title}offered/getAll`,

  registerCourseByStudent: () => `${process.env.REACT_APP_API_URL}${title}registered/register`,

  getSingleCourse: (id) => `${process.env.REACT_APP_API_URL}${title}get/${id}`,

  deleteSingleCourse: (id) => `${process.env.REACT_APP_API_URL}${title}delete/${id}`,
};
