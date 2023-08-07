const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({error : "No access token provided"});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken)=>{
        if(err){
            return res.status(403).json({error : "invalid access token"})
        }
        req.user = decodedToken;
        next();
    })
}

module.exports = verifyToken;