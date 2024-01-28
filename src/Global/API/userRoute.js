import axios from "axios";
import Cookies from "js-cookie";
import { request } from "./api";

const API = import.meta.env.VITE_API;
export const loginRoute = `${API}/login`;
export const registerRoute = `${API}/register`;
export const getUsersRoute = `/user`;
export const getUserDetailRoute = `${API}/user/account/detail`;
export const followUserRoute = `${API}/user/account/following`;
export const deleteUserRoute = `${API}/user/delete`;
export const editUserRoute = `${API}/user/edit`;

const token = Cookies.get("token");

// GET
// All Users
const getAllUsers = () => {
  return request({url:getUsersRoute})
}

// User Detail
const getUserDetail = async (id) => {
  return request({url:getUserDetailRoute,method:'post',data:id})
  // await axios
  //   .post(getUserDetailRoute, id, {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => res);
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
    .then((res) => res);
};

export { getAllUsers, getUserDetail, followUser };
