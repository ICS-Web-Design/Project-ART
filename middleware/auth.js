const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg: "No Token - Authorization Denied"})
    }

    // Verify Token
    try{
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        req.profile = decoded.profile
        next()
    } catch(err) {
        res.status(401).json({ msg: "Token is not valid"})
    }
}

