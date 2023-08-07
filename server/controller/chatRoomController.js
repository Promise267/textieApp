const chatRoom = require("../model/chatRoom")
const User = require("../model/user")
module.exports = {

    get : (req, res)=>{
        chatRoom.find().then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
            console.log(err);
        });
    },
    
    post : async(req, res) => {
        try {
            // const { id } = req.params;
            // const user = await User.findById(id)
            
            // if(!user){
            //     return res.status(404).json({message : "User not found"})
            // }

            const { room } = req.body;

            const newRoom = new chatRoom({
                room,
            })
    
            chatRoom.findOne({room : room}).then((existingRoom) => {
                if(existingRoom){
                    res.status(409).json({message : "Room already exists"})
                }
                else{
                    newRoom.save().then(() => {
                        res.json({message : "Room successfully created"})
                    }).catch((err) => {
                        res.send(err)
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
}