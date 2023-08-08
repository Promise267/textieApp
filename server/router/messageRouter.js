const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController")

router.get("/getMessage/:roomid", messageController.get);
router.post("/addMessage/:roomid/:userid", messageController.post)

module.exports = router