import { create } from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  loginUser: null,
  comments: [],
  blog: {},
  profile: {},
  activeUsers: [],
  filterBlogs: "",
  addUser: (payload) => set(() => ({ loginUser: payload })),
  addBlog: (payload) => set(() => ({ blog: payload })),
  addComment: (payload) =>
    set((store) => ({ comments: [...store.comments, payload] })),
  addProfile: (payload) => set(() => ({ profile: payload })),
  addActiveUsers: (payload) => set(() => ({ activeUsers: payload })),
  setFilterBlog: (payload) => set(() => ({ filterBlogs: payload })),
});

export const userStore = create(persist(store, { name: "blog" }));
