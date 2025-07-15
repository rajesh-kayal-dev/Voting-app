const jwt = require('jsonwebtoken');
const { use } = require('passport');

const jwtAuthenticate = (req, res, next) => {


    // Check if the request has a token
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({ error: 'Token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorize' });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(402).json({ error: 'Invalid token' });
        
    }

}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000} );

}

module.exports = {jwtAuthenticate, generateToken};