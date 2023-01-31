import axios from "axios";

export const getAllPosts = async (token) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/post/";
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getPost = async (id, token) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/post/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getPostComments = async (id, token) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/comment/" + id;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
