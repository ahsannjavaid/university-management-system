import { BASE_URL } from "../config";

const title = "course/";

export const courseEndpoints = {
  registerCourse: () => `${BASE_URL}${title}register`,

  getCourses: () => `${BASE_URL}${title}getAll`,

  getStudentsOfInstructor: (id) => `${BASE_URL}${title}registeredStudents/getAll/${id}`,

  offerCourse: () => `${BASE_URL}${title}offered/register/`,

  getCoursesOfInstructor: (id) => `${BASE_URL}${title}offered/getAll/${id}`,

  getCoursesOfStudent: (id) => `${BASE_URL}${title}registered/getAll/${id}`,

  getOfferedCourses: () => `${BASE_URL}${title}offered/getAll`,

  registerCourseByStudent: () => `${BASE_URL}${title}registered/register`,

  getSingleCourse: (id) => `${BASE_URL}${title}get/${id}`,

  deleteSingleCourse: (id) => `${BASE_URL}${title}delete/${id}`,
};
