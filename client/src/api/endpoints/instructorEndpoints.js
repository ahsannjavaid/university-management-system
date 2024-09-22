import { BASE_URL } from '../config';

const title = 'instructor/';

export const instructorEndpoints = {
  loginInstructor: () => `${BASE_URL}${title}login`,

  registerInstructor: () => `${BASE_URL}${title}register`,

  getInstructors: () => `${BASE_URL}${title}getAll`,

  getAttendances: (id, courseId, date) => `${BASE_URL}${title}getAttendances?instructorId=${id}&courseId=${courseId}&date=${date}`,

  postAttendance: () => `${BASE_URL}${title}postAttendance`,

  editAttendance: (id) => `${BASE_URL}${title}editAttendance/${id}`,

  getAcademics: (instructorId, courseId, examType, activityNumber) =>
    `${BASE_URL}${title}getAcademics?instructorId=${instructorId}&courseId=${courseId}&examType=${examType}&activityNumber=${activityNumber}`,

  postAcademics: () => `${BASE_URL}${title}postAcademics`,

  editAcademics: (id) => `${BASE_URL}${title}editAcademics/${id}`,

  getSingleInstructor: (id) => `${BASE_URL}${title}get/${id}`,

  editInstructor: (id) => `${BASE_URL}${title}edit/${id}`,

  deleteSingleInstructor: (id) => `${BASE_URL}${title}delete/${id}`,
};
