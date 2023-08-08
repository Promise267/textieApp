const express = require("express");
const router = express.Router();
const chatRoomUserController = require("../controller/chatRoomUserController")

router.get("/getChatUser/:userid", chatRoomUserController.get);
router.post("/addChatUser/:roomid/:userid", chatRoomUserController.post)

module.exports = router