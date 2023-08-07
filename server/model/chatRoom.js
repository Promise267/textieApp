const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
    room : String,
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "users"}
})

const chatRoom = mongoose.model("chatRoom", chatRoomSchema);
module.exports = chatRoom