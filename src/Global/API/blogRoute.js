import axios from "axios";
import Cookies from "js-cookie";
import { request } from "./api";

const getAllBlogRoute = `/blog`;
const createBlogRoute = `${import.meta.env.VITE_API}/blog/create`;
const likeBlogRoute = `/blog/like`;
const commentBlogRoute = `/blog/comment`;
const deleteCmtRoute = `/blog/comment/delete`;
export const deleteBlogRoute = `/blog/delete`;
export const getOwnerBlogRoute = `/blog/owner-blogs`;

const token = Cookies.get("token");

// GET
// Sort all blogs by descending order based on created date
const getAllBlogs = () => {
  return request({ url: getAllBlogRoute });
};

// POST
const createBlog = async (body) => {
  await axios.post(createBlogRoute, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Need blogId to like and unlike post
const likeBlogs = async (id) => {
  return request({ url: likeBlogRoute, method: "post", data: id });
};

// Comment
const commentBlog = async (body) => {
  return request({ url: commentBlogRoute, method: "post", data: body });
};

// Delete
const deleteCmt = async (id) => {
  return request({ url: deleteCmtRoute, method: "delete", data: id });
};

const getOwnerBlog = async (id) => {
  return request({ url: getOwnerBlogRoute, method: "post", data: id });
};

export {
  getAllBlogs,
  createBlog,
  likeBlogs,
  commentBlog,
  deleteCmt,
  getOwnerBlog,
};
