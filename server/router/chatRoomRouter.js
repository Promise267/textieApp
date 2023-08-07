const express = require("express");
const router = express.Router();
const chatRoomController = require("../controller/chatRoomController")

router.get("/chatRoom/getRoom", chatRoomController.get)
router.post("/chatRoom/addRoom", chatRoomController.post)


module.exports = router