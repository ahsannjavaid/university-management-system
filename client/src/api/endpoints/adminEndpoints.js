// import { BASE_URL } from "../config";

const title = "admin/";

export const adminEndpoints = {
  loginAdmin: () => `${process.env.REACT_APP_API_URL}${title}login`,

  registerAdmin: () => `${process.env.REACT_APP_API_URL}${title}register`,

  getAdmins: () => `${process.env.REACT_APP_API_URL}${title}getAll`,

  getSingleAdmin: (id) => `${process.env.REACT_APP_API_URL}${title}get/${id}`,

  editAdmin: (id) => `${process.env.REACT_APP_API_URL}${title}edit/${id}`,

  deleteSingleAdmin: (id) => `${process.env.REACT_APP_API_URL}${title}delete/${id}`,
};
