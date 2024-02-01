import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  userInfo: null,
  comments: [],
  blog: {},
  profile: {},
  activeUsers: [],
  addUser: (payload) => set(() => ({ userInfo: payload })),
  addBlog: (payload) => set(() => ({ blog: payload })),
  addComment: (payload) =>
    set((store) => ({ comments: [...store.comments, payload] })),
  addProfile: (payload) => set(() => ({ profile: payload })),
  addActiveUsers: (payload) => set(() => ({ activeUsers: payload })),
  // fetchProfile: async (id) => {
  //   try {
  //     const res = await axios.post(getOwnerBlogRoute, { ownerId: id });
  //     set(() => ({ profile: res?.data?.data[0] }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // fetchUserDetail: async (id, token) => {
  //   if (token) {
  //     await axios
  //       .post(
  //         getUserDetailRoute,
  //         { userId: id },
  //         {
  //           headers: {
  //             "Content-type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         set(() => ({ userInfo: res?.data?.data }));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // },
});

export const userStore = create(persist(store, { name: "blog" }));
