import axios from "axios";

export const authLogin = async ({ username, password }) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/auth/login";
  const res = await axios.post(url, { username, password });
  return res;
};
