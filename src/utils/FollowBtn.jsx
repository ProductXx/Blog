import React, { useEffect, useState } from "react";
import { useFollowUser, useGetUserDetail } from "../Hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { userStore } from "../Global/Store/store";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

const FollowBtn = ({ ownerInfo }) => {
  const queryClient = useQueryClient();
  const loginUser = userStore((store) => store.loginUser);
  const addFollowing = userStore((store) => store.addUser);

  const { mutateAsync: followUser, isPending } = useFollowUser(queryClient);
  const { mutateAsync: fetchLoginUserDetail } = useGetUserDetail(queryClient);

  const isFollowing = loginUser?.following.some((id) => id === ownerInfo._id);

  useEffect(() => {
    fetchLoginUserDetail({ userId: loginUser?._id }).then((res) =>
      addFollowing(res?.data?.data)
    );
  }, [isPending]);

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          followUser({ userId: ownerInfo._id });
        }}
        className={`py-1 px-4 rounded ${
          isFollowing ? "bg-primary text-secondary" : "bg-lightWhite"
        } transition-all`}
      >
        <div className="flex space-x-2 items-center transition-all">
          {isPending ? (
            <>...</>
          ) : isFollowing ? (
            <>
              <span>Following</span>
              <FaCheckCircle />
            </>
          ) : (
            <>
              <span>Follow</span>
              <FaPlusCircle />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBtn;
