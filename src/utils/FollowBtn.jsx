import React, { useEffect, useState, useCallback } from "react";
import { useFollowUser, useGetUserDetail } from "../Hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { userStore } from "../Global/Store/store";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const FollowBtn = ({ ownerInfo }) => {
  const queryClient = useQueryClient();
  const loginUser = userStore((store) => store.loginUser);
  const addFollowing = userStore((store) => store.addUser);

  const { mutateAsync: followUser, isPending } = useFollowUser(queryClient);
  const { mutateAsync: fetchLoginUserDetail } = useGetUserDetail(queryClient);

  const isFollowing = loginUser?.following?.some((id) => id === ownerInfo._id);

  const handleClick = useCallback(() => {
    followUser({ userId: ownerInfo._id }).then(() => {
      fetchLoginUserDetail({ userId: loginUser?._id }).then((res) => {
        addFollowing(res?.data?.data);
      });
    });
  }, [followUser, fetchLoginUserDetail, addFollowing, loginUser, ownerInfo]);

  return (
    <div>
      <button
        disabled={isPending}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className={`py-1 px-4 rounded ${
          isFollowing
            ? "bg-primary text-secondary"
            : "bg-lightWhite text-lightGray"
        } transition-all`}
      >
        <div className="flex space-x-2 items-center transition-all">
          {isFollowing ? (
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
      </button>
    </div>
  );
};

export default FollowBtn;
