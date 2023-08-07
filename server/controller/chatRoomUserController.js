const chatRoomUser = require("../model/chatRoomUser");
const chatRoom = require("../model/chatRoom");
const User = require("../model/user");

module.exports = {
    get : (req, res)=>{
        chatRoomUser.find().then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
            console.log(err);
        });
    },

    post : (req, res)=>{
        const{roomid, userid} = req.params;

        const room = chatRoom.findById(roomid);
        const user = User.findById(userid)

        if(!room && !user){
            res.status(404).json({message : "Room with user not found"})
        }
        else{
            const newchatRoomUser = new chatRoomUser({
                roomid,
                userid
            })

            chatRoomUser.find({roomid : roomid, userid : userid}).then((existingUser) => {
                if(existingUser){
                    res.status(409).json({message : "User already joined"})
                }
                else{
                    newchatRoomUser.save().then(() => {
                        res.json({message : "User joined the chat successfully"})
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                res.send(err)
                console.log(err);
            });
        }
    }

}