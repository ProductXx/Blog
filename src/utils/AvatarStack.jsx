import React from "react";
import Avatar from "./Avatar";

const AvatarStack = ({ usersData, followers, following }) => {
  const filterUsers = (usersData) => {
    if (followers) {
      return usersData?.filter((user) => followers?.includes(user._id));
    } else {
      return usersData?.filter((user) => following?.includes(user._id));
    }
  };

  return (
    <div className="flex gap-3 w-full overflow-x-scroll">
      {filterUsers(usersData)?.map((user) => (
        <div key={user?._id} className="flex flex-col gap-1">
          <Avatar name={user?.email} stack={true} />
        </div>
      ))}
    </div>
  );
};

export default AvatarStack;
