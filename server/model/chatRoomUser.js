const mongoose = require("mongoose");

const chatRoomUserSchema = mongoose.Schema({
    roomid : {type : mongoose.Schema.Types.ObjectId, ref : "chatrooms"},
    userid : {type: mongoose.Schema.Types.ObjectId, ref : "users"}
})

const ChatRoomUser = mongoose.model("chatRoomUser", chatRoomUserSchema);

module.exports = ChatRoomUser;