const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const openPaths = ['/users/signup', '/users/login'];

    if (openPaths.includes(req.path)) {
        return next();
    }
    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: '토큰이 없음.' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(403).json({ message: '유효하지 않은 토큰' });
    }
};