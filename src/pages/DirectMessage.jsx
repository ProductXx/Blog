import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOwnerBlog } from "../Hooks/blog";
import Avatar from "../utils/Avatar";
import MessageForm from "../utils/MessageForm";
import { useSocket } from "../Hooks/socket";
import { userStore } from "../Global/API/store";
import axios from "axios";

const DirectMessage = () => {
  const { id } = useParams();
  const { mutateAsync: profileData } = useGetOwnerBlog();
  const userInfo = userStore((store) => store.userInfo);
  const socket = useSocket("http://localhost:8000");

  const [messages, setMessages] = useState([]);
  const [msgHistory, setMsgHistory] = useState([]);
  // console.log(msgHistory)

  // for history message
  const getMessages = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/message",
        {
          senderId: userInfo?._id,
          receiverId: id,
        }
      );
      setMsgHistory(response?.data?.messages);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // for showing active
  const isActive = userStore((store) => store.activeUsers);
  const addActiveUsers = userStore((store) => store.addActiveUsers);

  const [profile, setProfile] = useState([]);

  const isUserActive = isActive.some(
    (act) => act?.userInfo?._id === profile?._id
  );

  useEffect(() => {
    profileData({ ownerId: id }).then((res) => setProfile(res?.data?.data[0]));
    getMessages();
  }, [id]);

  // for message and some info
  useEffect(() => {
    if (socket) {
      // for some info
      socket.emit("activeUser", userInfo);

      socket.on("showActiveUser", (data) => {
        addActiveUsers(data);
      });

      // for message
      socket.on("messageSent", (sentMessage) => {
        setMessages((messages) => [
          ...messages,
          { content: sentMessage, type: "sent" },
        ]);
      });

      socket.on("receiveMessage", (receivedMessage) => {
        setMessages((messages) => [
          ...messages,
          { content: receivedMessage, type: "received" },
        ]);
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("messageSent");
      };
    }
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("Message", { senderId: userInfo._id, receiverId: id, message });
  };

  const renderMessageHistory = () => {
    return msgHistory.map((msg, index) => (
      <div
        key={index}
        className={`message ${
          msg?.receiverId === id ? "sent-message" : "received-message"
        }`}
      >
        {msg.content}
      </div>
    ));
  };

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <div
        key={index}
        className={`message ${
          msg.type === "sent" ? "sent-message" : "received-message"
        }`}
      >
        {msg.type === "sent" ? msg.content.content : msg.content.content}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-lg">
        <div className=" flex justify-around items-center h-full">
          <Avatar name={profile?.email} size={"lg"} />
          <div className="">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl">{profile?.name}</h1>
                {isUserActive ? (
                  <span className="text-green-500">is active</span>
                ) : (
                  <span className="text-red-500">is offline</span>
                )}
              </div>
              <p className="font-semibold">{profile?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">{renderMessageHistory()}</div>
      <div className="flex flex-col gap-3 mb-20">{renderMessages()}</div>

      <div className="w-[90%] bottom-2 right-[50%] translate-x-[50%] fixed">
        <MessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default DirectMessage;
