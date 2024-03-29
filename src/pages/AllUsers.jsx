import React from "react";
import Avatar from "../utils/Avatar";
import { userStore } from "../Global/Store/store";
import FollowBtn from "../utils/FollowBtn";
import { useGetAllUsers } from "../Hooks/user";

const AllUsers = () => {
  const loginUser = userStore((store) => store.loginUser);
  const { data: users } = useGetAllUsers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="space-y-3">
        {users?.map((user) =>
          user._id === loginUser._id ? null : (
            <div
              key={user._id}
              className="flex items-center justify-between border-b p-3"
            >
              <div className="flex items-center space-x-3">
                <Avatar name={user.email} id={user._id} />
                <h1 className="text-sm">{user.name}</h1>
              </div>
              <FollowBtn ownerInfo={user} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllUsers;
