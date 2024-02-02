import { useMutation, useQuery } from "@tanstack/react-query";
import { followUser, getUserDetail } from "../Global/API/userRoute";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// Query
export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["Users"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_API}/user`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => res?.data?.data),
  });

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
