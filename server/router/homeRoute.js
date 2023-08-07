const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController")
const chatController = require("../controller/chatRoomController")

router.get("/home", homeController.get);
router.get("/home/chat", chatController.get)

module.exports = router