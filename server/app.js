require("dotenv").config();
const express = require('express');
const app = express();
const port = 5000;

const userRouter = require("./router/userRoute");
const loginRouter = require("./router/loginRoute");
const homeRouter = require("./router/homeRoute");
const logoutRouter = require("./router/logoutRoute")
const chatRoomRouter = require("./router/chatRoomRouter")
const messageRouter = require("./router/messageRouter");
const chatRoomUser = require("./router/chatRoomUserRouter");

const db = require("./middleware/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const createSocketServer = require("./middleware/socket");
const server = http.createServer(app);
const io = createSocketServer(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", userRouter);
app.use("/", loginRouter);
app.use("/", homeRouter);
app.use("/", logoutRouter);
app.use("/", chatRoomRouter)
app.use("/", messageRouter);
app.use("/",chatRoomUser)

io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`A user disconnected ${socket.id}`);
    })

    socket.on("login", ()=>{
      console.log(`The user ${socket.id} has logged in`);
    })

    socket.on("logout", ()=>{
      console.log(`The user ${socket.id} has logged out`);
    })

    socket.on("joinRoom", (room)=>{
      socket.join(room)
      console.log(`User with ID : ${socket.id} joined room : ${room}`);
    })

    socket.on("sendMessage", (messageData)=>{
      socket.to(messageData.room).emit("recieveMessage", messageData)
      console.log(messageData);
    })

});

// Start the server
server.listen(port, () => console.log(`Example app listening on port ${port}!`));

