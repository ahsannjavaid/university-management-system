import { BASE_URL } from "../config";

const title = "admin/";

export const adminEndpoints = {
  loginAdmin: () => `${BASE_URL}${title}login`,

  registerAdmin: () => `${BASE_URL}${title}register`,

  getAdmins: () => `${BASE_URL}${title}getAll`,

  getSingleAdmin: (id) => `${BASE_URL}${title}get/${id}`,

  editAdmin: (id) => `${BASE_URL}${title}edit/${id}`,

  deleteSingleAdmin: (id) => `${BASE_URL}${title}delete/${id}`,
};
