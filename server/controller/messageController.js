const chatRoomUser = require("../model/chatRoomUser");
const Message = require("../model/message");

module.exports = {
    get : (req, res)=>{
        Message.find().then((data) => {
            res.send(data);
            
        }).catch((err) => {
            res.send(err);
            console.log(err);
        });
    },

    post: async(req, res)=>{
        const {roomid, userid} = req.params;

        const roomUser = await chatRoomUser.findOne({roomid: roomid, userid : userid})


        if(!roomUser){
            return res.status(404).json({message : "User with Room not found"})
        }

        const {message, time} = req.body;

        const newMessage = new Message({
            message,
            time,
            userid : userid,
            roomid : roomid
        })

        newMessage.save().then((data) => {
            res.json({message : "Message sent successfully"})
        }).catch((err) => {
            res.send(err)
            console.log(err);
        });
    }

}