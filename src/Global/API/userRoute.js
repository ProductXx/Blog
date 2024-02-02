import axios from "axios";
import Cookies from "js-cookie";
import { request } from "./api";

const API = import.meta.env.VITE_API;
export const loginRoute = `${API}/login`;
export const registerRoute = `${API}/register`;
export const getUserDetailRoute = `${API}/user/account/detail`;
export const followUserRoute = `${API}/user/account/following`;
export const deleteUserRoute = `${API}/user/delete`;
export const editUserRoute = `${API}/user/edit`;

const token = Cookies.get("token");

// GET
// User Detail
const getUserDetail = async (id) => {
  return request({ url: getUserDetailRoute, method: "post", data: id });
};

// POST
// Follow User
const followUser = async (id) => {
  await axios
    .post(followUserRoute, id, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => console.log(res));
};

export { getUserDetail, followUser };
