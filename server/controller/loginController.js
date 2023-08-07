const User = require("../model/user")
const jwt = require("jsonwebtoken");

module.exports = {
    post : (req, res) => {
        const {username, password} = req.body

        User.findOne({username : username, password : password}).then((existingUser) => {
            if(existingUser){
                const accessToken = jwt.sign({username : existingUser.username}, process.env.TOKEN_SECRET, {expiresIn : '1h'});
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                });
                res.json({ message: "Login successful", accessToken: accessToken });
            }
            else{
                return res.status(401).json({error : "Invalid Username or Password"});
            }
        }).catch((err) => {
            res.send(err)
        });
    }
}