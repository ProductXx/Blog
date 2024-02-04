import React from "react";
import { userStore } from "../Global/Store/store";
import Avatar from "../utils/Avatar";
import { useGetAllUsers } from "../Hooks/user";
import { TbMessageCircleBolt } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const loginUser = userStore((store) => store.loginUser);
  const activeUser = userStore((store) => store.activeUsers);
  const { data: users } = useGetAllUsers();
  // console.log(loginUser, users);

  const nav = useNavigate();

  // for showing active
  // const isMatch = users?.data?.data.some((user) =>
  //   activeUser?.some((acusr) => acusr?.loginUser?._id === user?._id)
  // );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="space-y-3">
        {users?.map((user) => {
          const isActive = activeUser?.some(
            (acusr) => acusr?.loginUser?._id === user?._id
          );
          // for showing all users
          return user._id === loginUser._id ? null : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                nav(`/message/${user._id}`);
              }}
              key={user._id}
              className="flex items-center justify-between border-b p-3"
            >
              <div className="flex items-center space-x-3 ">
                <div className="relative">
                  <Avatar name={user.email} id={user._id} />
                  {isActive && (
                    <span className="w-3 h-3 absolute bg-green-600 rounded-full right-0 bottom-0"></span>
                  )}
                </div>
                <h1 className="text-sm">{user.name}</h1>
              </div>
              <TbMessageCircleBolt className="text-2xl text-gray-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Message;
