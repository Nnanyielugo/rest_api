const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) =>{
    // use a try...catch block to decode token and call next or throw exception if decoding fails or token is not valid
    try{
        // get token from header, remove whitespace and select only token [1], leaving Bearer [0]
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userData = decoded
        next();
    } catch(error){
        return res.status(401).json({
            message: "Auth failed"
        })
    }   
    
}