const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const email = req.headers.email;
        const token = req.headers.authorization;
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

        User.findById(decodeToken.userId)
            .then((user) => {
                if(email == user.email){
                    next();
                }else{
                    res.status(403).json({message: `UNAUTHORIEZD 1`})
                }
            })
            .catch(() => res.status(403).json({message: `UNAUTHORIEZD 2`}))
    } catch{
        res.status(403).json({message: `UNAUTHORIZED 3`})
    }
}