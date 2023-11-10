// src\server.js
import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";
import express from "express";
import path from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views")); // 'views' 디렉토리의 정확한 위치를 지정합니다.
app.use("/public", express.static(path.join(__dirname, "/public"))); // 정적 파일 경로를 추가.
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

/* const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
- WebSocket 방법으로 진행한 코드 소스 */

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

/* function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
} 
- WebSocket 방법으로 진행한 코드 소스 */

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("hello from the backend");
    }, 15000);
  });
});

/* const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break; // 여기에 break를 추가합니다.
      case "nickname":
        socket["nickname"] = message.payload;
        break; // 여기에 break를 추가합니다.
    }
  });
});  
- WebSocket 방법으로 진행한 코드 소스 */

// server.listen(3000, handleListen);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);