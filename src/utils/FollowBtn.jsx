import React from "react";
import { useFollowUser } from "../Hooks/user";
import { useQueryClient } from "@tanstack/react-query";

const FollowBtn = ({ userId, ownerInfo }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: followUser, isPending } = useFollowUser(queryClient);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        followUser({ userId: ownerInfo._id });
      }}
      className="py-1 px-4 bg-lightWhite rounded"
    >
      <span>
        {isPending ? (
          <p>...</p>
        ) : ownerInfo?.followers?.includes(userId) ? (
          "Following"
        ) : (
          "Follow +"
        )}
      </span>
    </div>
  );
};

export default FollowBtn;
