import { useState, useEffect, PropsWithChildren } from "react";
import { Socket } from "socket.io-client";
import socketInit from "src/services/socket";
import { useAuthStore } from "src/store/authStore";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children, ...props }: PropsWithChildren) => {
  const token = useAuthStore((state) => state.token);
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (!token) return;

    const socketInstance = socketInit();
    setSocket(socketInstance);

    return () => {
      socketInstance?.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket} {...props}>
      {children}
    </SocketContext.Provider>
  );
};
