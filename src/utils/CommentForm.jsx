import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoIosSend } from "react-icons/io";
import Avatar from "./Avatar";
import { BiSolidTrashAlt } from "react-icons/bi";
import { userStore } from "../Global/Store/store";
import { useCommentBlog, useDeleteCmt } from "../Hooks/blog";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllUsers } from "../Hooks/user";

const CommentForm = ({ comments, blogId }) => {
  const [comment, setComment] = useState("");
  const loginUser = userStore((store) => store.loginUser);
  const queryClient = useQueryClient();

  const { data: users } = useGetAllUsers();
  const { mutateAsync } = useCommentBlog(queryClient);
  const { mutateAsync: deleteCmt } = useDeleteCmt(queryClient);

  // Post comment route need blogId and User Comment
  const postComment = async (e) => {
    e.preventDefault();
    if (comment === "") {
      toast.error("Comment is not be empty!");
      return;
    } else {
      mutateAsync({ blogId, userComment: comment });
      setComment("");
    }
  };

  // Show Commented User
  const cmtUserName = (cmt) => {
    const user = users?.data?.data?.find((el) => el._id === cmt.userId);
    return user;
  };

  return (
    <>
      <div className="space-y-3 bg-white rounded-md relative">
        <div className="font-bold text-lightGray text-xl p-3">
          Comments{" "}
          <span className="text-sm bg-primary text-secondary px-3 py-1 rounded-md">
            {comments?.length}
          </span>
        </div>
        <div className=" h-full max-h-[200px] overflow-y-scroll px-3 space-y-3">
          {comments?.map((cmt, i) => {
            return (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar name={cmtUserName(cmt)?.email} />
                    <span className="font-semibold text-sm">
                      {cmtUserName(cmt)?.name}
                    </span>
                  </div>
                  {loginUser?._id === cmt?.userId ? (
                    <div className="flex gap-2">
                      <BiSolidTrashAlt
                        onClick={() => deleteCmt({ commentId: cmt?._id })}
                        className="text-xl border rounded-full w-9 h-9 p-2 text-red-600"
                      />
                    </div>
                  ) : null}
                </div>

                <span className="bg-[#fff] p-3 relative rounded-md after:w-5 after:h-5 after:bg-[#fff] after:absolute after:-top-2 after:left-3 after:rotate-45 after:rounded-sm">
                  {cmt.userComment}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-2 border-t p-3">
          <Avatar />
          <form
            onSubmit={postComment}
            className="flex flex-1 rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="px-3 py-1 outline-none h-10 w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="p-2 bg-primary text-secondary">
              <IoIosSend className="text-xl" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
