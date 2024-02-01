export const connectSocket = (userInfo, socket, addActiveUsers) => {
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.emit("activeUser", userInfo);

  socket.on("showActiveUser", (data) => {
    addActiveUsers(data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server");
  });
};
