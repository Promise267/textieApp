const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();

router.get("/user/getUser", userController.get)
router.post("/user/addUser", userController.post)

module.exports = router