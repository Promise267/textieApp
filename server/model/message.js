const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message : String,
    time : String,
    roomid : {type: mongoose.Schema.Types.ObjectId, ref : "chatrooms"},
    userid : {type : mongoose.Schema.Types.ObjectId, ref : "users"}
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;