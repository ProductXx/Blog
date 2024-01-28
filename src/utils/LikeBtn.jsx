import React from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useLikeBlog } from "../Hooks/blog";
import { useQueryClient } from "@tanstack/react-query";

const LikeBtn = ({ like, blogId, userId }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: likeBlog, isPending } = useLikeBlog(queryClient);

  const likeCount = like ? like.length : 0;
  // if login userId and likeUserId same like btn will change
  const match = like?.find((el) => el === userId);

  if (isPending) {
    return <p className="px-3">...</p>;
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        likeBlog({ blogId });
      }}
      className={`flex items-center space-x-2`}
    >
      {match ? (
        <BiSolidLike className="text-primary text-2xl" />
      ) : (
        <BiLike className="text-lightGray text-2xl" />
      )}
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeBtn;
