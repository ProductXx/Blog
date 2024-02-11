import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import Avatar from "./Avatar";
import { toast } from "react-toastify";

const MessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="space-y-3 bg-white rounded-md relative">
        <div className=" h-full max-h-[200px] overflow-y-scroll px-3 space-y-3"></div>
        <div className="flex items-center space-x-2 border-t p-3">
          <Avatar />
          <input
            type="text"
            placeholder="Write a message..."
            className="px-3 py-1 outline-none h-10 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim()) {
                e.preventDefault();
                sendMessage(message.trim());
                setMessage("");
              }
            }}
          />
          <button
            onClick={() => {
              if (message.trim()) {
                sendMessage(message.trim());
                setMessage("");
              }
            }}
            disabled={!message.trim()}
            className={`p-2 bg-primary text-secondary ${
              !message.trim() ? "opacity-50" : ""
            }`}
            aria-label="Send message"
          >
            <IoIosSend className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
