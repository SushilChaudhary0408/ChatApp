
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});

const users = {};

// Used to listen events on server side
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("Hello", users);
    }
    // Send the events to all connected users
    io.emit("getOnlineUsers", Object.keys(users));

    // Listen for client-side events
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });
});

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

export { app, io, server };
