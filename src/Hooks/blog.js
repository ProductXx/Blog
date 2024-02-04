import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  commentBlog,
  createBlog,
  deleteCmt,
  getOwnerBlog,
  likeBlogs,
} from "../Global/API/blogRoute";


// Mutation
export const useCreateBlog = (queryClient) => {
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Blogs"] }),
    onError: () => toast.error("You Need to login!", { autoClose: 3000 }),
  });
};

export const useLikeBlog = (queryClient) => {
  return useMutation({
    mutationFn: likeBlogs,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Blogs"] }),
    onError: () => toast.error("You Need to login!", { autoClose: 3000 }),
  });
};

export const useCommentBlog = (queryClient) => {
  return useMutation({
    mutationFn: commentBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Blog"] }),
  });
};

export const useDeleteCmt = (queryClient) => {
  return useMutation({
    mutationFn: deleteCmt,
    onSuccess: () => {
      toast.success("Comment is deleted.");
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
  });
};

export const useGetOwnerBlog = () => {
  return useMutation({
    mutationFn: getOwnerBlog,
    onSuccess: (data) => data,
    onError: (err) => console.log(err),
  });
};
