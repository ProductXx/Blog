import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverUrl = "http://localhost:8000") => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [serverUrl]);

  return socket;
};
