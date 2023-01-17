const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = process.env.SECRET_KEY;
const UNAUTHORIZED_MSG = "UNAUTHORIZED";

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, SECRET_KEY);

        const user = await User.findOne({_id : decodedToken.userId});
    if(!user){
      throw new Error(UNAUTHORIZED_MSG);
    }
    req.user = user;
    next();
  } catch (error) {
    if(error.message === UNAUTHORIZED_MSG){
      res.status(401).json({ message: 'You are not authenticated.' });
    }
    else if(error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError){
      res.status(401).json({ message: 'Token expired or invalid' });
    }else{
      res.status(500).json({ message: 'Server Error' });
    }
  }
};



