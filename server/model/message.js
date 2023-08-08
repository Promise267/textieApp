const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    roomid : {type: mongoose.Schema.Types.ObjectId, ref : "chatrooms"},
    userid : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    message : String,
    time : String
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;