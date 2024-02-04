import Cookies from "js-cookie";
import { request } from "./api";

const API = import.meta.env.VITE_API;
export const loginRoute = `${API}/login`;
export const registerRoute = `${API}/register`;
export const getUserDetailRoute = `${API}/user/account/detail`;
export const followUserRoute = `/user/account/following`;
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
  return request({url: followUserRoute,method:'post',data:id})
};

export { getUserDetail, followUser };
