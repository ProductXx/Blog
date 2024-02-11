import React from "react";

const CommentForm = () => {
  return (
    <div className="flex items-center space-x-2 border-t p-3">
      <Avatar />
      <form
        onSubmit={postComment}
        className="flex flex-1 rounded overflow-hidden"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          className={`px-3 py-1 outline-none h-10 w-full ${
            edit ? "border-2 border-primary rounded-l" : ""
          }`}
          value={edit ? editCmt.userComment : comment}
          onChange={(e) => {
            edit
              ? setEditCmt({ ...editCmt, userComment: e.target.value })
              : setComment(e.target.value);
          }}
        />
        <button type="submit" className="p-2 bg-primary text-secondary">
          <IoIosSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
