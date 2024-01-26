const API = import.meta.env.VITE_API;

const loginRoute = `${API}/login`;
const registerRoute = `${API}/register`;
const getUsersRoute = `${API}/user`;
const getUserDetailRoute = `${API}/user/account/detail`;
const followUserRoute = `${API}/user/account/following`;
const deleteUserRoute = `${API}/user/delete`;
const editUserRoute = `${API}/user/edit`;
const getAllBlogRoute = `${API}/blog`;
const createBlogRoute = `${API}/blog/create`;
const getSingleBlogRoute = `${API}/blog/single-blog`;
const getOwnerBlogRoute = `${API}/blog/owner-blogs`;
const likeBlogRoute = `${API}/blog/like`;
const commentBlogRoute = `${API}/blog/comment`;
const deleteBlogRoute = `${API}/blog/delete`;

export {
  loginRoute,
  registerRoute,
  getUsersRoute,
  getUserDetailRoute,
  followUserRoute,
  deleteUserRoute,
  editUserRoute,
  getAllBlogRoute,
  createBlogRoute,
  likeBlogRoute,
  getSingleBlogRoute,
  commentBlogRoute,
  getOwnerBlogRoute,
  deleteBlogRoute,
};
