// import { BASE_URL } from "../config";

const title = "student/";

export const studentEndpoints = {
  loginStudent: () => `${process.env.REACT_APP_API_URL}${title}login`,

  registerStudent: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getStudents: () => `${process.env.REACT_APP_API_URL}${title}getAll`,

  getSingleStudent: (id) => `${process.env.REACT_APP_API_URL}${title}get/${id}`,

  getAcademics: (id, courseId, examType) => `${process.env.REACT_APP_API_URL}${title}getAcademics?studentId=${id}&courseId=${courseId}&examType=${examType}`,

  getAttendances: (id, courseId) => `${process.env.REACT_APP_API_URL}${title}getAttendances?studentId=${id}&courseId=${courseId}`,

  getCourseAndExamTypeNames: (id) => `${process.env.REACT_APP_API_URL}${title}getCourseAndExamTypeNames/${id}`,

  editStudent: (id) => `${process.env.REACT_APP_API_URL}${title}edit/${id}`,

  deleteSingleStudent: (id) => `${process.env.REACT_APP_API_URL}${title}delete/${id}`,
};
