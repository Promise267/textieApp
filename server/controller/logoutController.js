const tokenBlackList = []
module.exports = {
    post : (req, res) => {
        const {accessToken} = req.body
        if(accessToken){
            res.json({message : "Successfull logged out"})
        }
        else{
            res.json({message : "Failed to Logout"})
        }
    }
}