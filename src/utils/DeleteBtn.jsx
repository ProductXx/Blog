import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const DeleteBtn = ({blogId}) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  // Delete Blog Mutation
  const { mutate: deleteBlog } = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API}/blog/delete/${blogId}`),
    onSuccess: () => {
      toast.success("Blog delete successful");
      queryClient.invalidateQueries({ queryKey: ["Blogs"] });
    },
    onError: (err) => console.log(err),
  });

  // Only owner can delete blog --> need blog id
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (token) {
      deleteBlog();
      return;
    }
    toast.error("You need to login!", { autoClose: 2000 });
    setTimeout(() => nav("/login"), 3000);
  };
  
  return (
    <div className="flex gap-2">
      <BiSolidTrashAlt
        onClick={handleDelete}
        className="text-xl border rounded-full w-9 h-9 p-2 text-red-600"
      />
    </div>
  );
};

export default DeleteBtn;
