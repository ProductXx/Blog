import { useMutation, useQuery } from "@tanstack/react-query";
import {
  followUser,
  getAllUsers,
  getUserDetail,
} from "../Global/API/userRoute";
import { toast } from "react-toastify";

// Query
export const useGetAllUsers = () => {
  return useQuery({ queryKey: ["Users"], queryFn: getAllUsers });
};

// Mutation
export const useFollowUser = (queryClient) => {
  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      queryClient.invalidateQueries({ queryKey: ["Blogs"] });
    },
    onError: () => toast.error("You Need to login!", { autoClose: 3000 }),
  });
};

export const useGetUserDetail = (queryClient) => {
  return useMutation({
    mutationFn: getUserDetail,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Users"] }),
  });
};
