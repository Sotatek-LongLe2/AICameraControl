import { io, Socket } from "socket.io-client";
import { useAuthStore } from "src/store/authStore";

const socketInit = (): Socket | undefined => {
  // Get the authentication token from the store
  const token = useAuthStore.getState().token;
  if (!token) return; // Return undefined if there is no token

  // Initialize the socket connection with configuration options
  const socket: Socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
    query: { token }, // Pass the token as a query parameter
    reconnection: true, // Enable automatic reconnection
    reconnectionAttempts: 10, // Maximum number of reconnection attempts
    reconnectionDelay: 5000, // Delay between reconnection attempts in milliseconds
    timeout: 20000, // Connection timeout in milliseconds
  });

  // Event listener for successful connection
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  // Event listener for disconnection
  socket.on("disconnect", (reason) => {
    console.warn("Disconnected from Socket.IO server:", reason);
    if (reason === "io server disconnect") {
      // Attempt to reconnect if the server disconnects the client
      socket.connect();
    }
  });

  // Event listener for connection errors
  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error.message);
  });

  return socket; // Return the socket instance
};

export default socketInit;
