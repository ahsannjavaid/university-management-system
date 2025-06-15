// import { BASE_URL } from '../config';

const title = 'instructor/';

export const instructorEndpoints = {
  loginInstructor: () => `${process.env.REACT_APP_API_URL}${title}login`,

  registerInstructor: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getInstructors: () => `${process.env.REACT_APP_API_URL}${title}getAll`,

  getAttendances: (id, courseId, date) => `${process.env.REACT_APP_API_URL}${title}getAttendances?instructorId=${id}&courseId=${courseId}&date=${date}`,

  postAttendance: () => `${process.env.REACT_APP_API_URL}${title}postAttendance`,

  editAttendance: (id) => `${process.env.REACT_APP_API_URL}${title}editAttendance/${id}`,

  getAcademics: (instructorId, courseId, examType, activityNumber) =>
    `${process.env.REACT_APP_API_URL}${title}getAcademics?instructorId=${instructorId}&courseId=${courseId}&examType=${examType}&activityNumber=${activityNumber}`,

  postAcademics: () => `${process.env.REACT_APP_API_URL}${title}postAcademics`,

  editAcademics: (id) => `${process.env.REACT_APP_API_URL}${title}editAcademics/${id}`,

  getSingleInstructor: (id) => `${process.env.REACT_APP_API_URL}${title}get/${id}`,

  editInstructor: (id) => `${process.env.REACT_APP_API_URL}${title}edit/${id}`,

  deleteSingleInstructor: (id) => `${process.env.REACT_APP_API_URL}${title}delete/${id}`,
};
