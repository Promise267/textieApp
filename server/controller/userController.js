const User = require("../model/user");
const jwt = require("jsonwebtoken")
const token = require("../middleware/token")

module.exports = {
    get : (req, res) => {
        User.find().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    },

    post : (req, res) => {
        const {email, username, password} = req.body;

        const newUser = new User({
            email,
            username,
            password
        })

        User.findOne({username : username}).then((existingUser)=>{
            if(existingUser){
                return res.status(409).json({error : "Usename already exists"})
            }
            else{
                newUser.save().then(() => {
                    const accessToken = jwt.sign(
                        {username : newUser.username}, 
                        process.env.TOKEN_SECRET, 
                        {expiresIn : "1h"})
                        res.json({message : "User added Successfully", accessToken : accessToken})
                }).catch((err) => {
                    res.send(err);
                    console.log(err);
                });
            }
        })

    }
}