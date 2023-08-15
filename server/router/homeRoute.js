const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const homeController = require("../controller/homeController")
const chatController = require("../controller/chatRoomController")

router.get("/home", verifyToken, homeController.get);
router.get("/home/chat", verifyToken, chatController.get)

module.exports = router