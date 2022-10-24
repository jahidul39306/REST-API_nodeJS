const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.get('Authorization');
    token = token.split(' ')[1];
    if(!token){
        return res.status(401).send('Invalid token');
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    return next();
}