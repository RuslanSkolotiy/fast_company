const TokenService = require('../services/tokenService')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        console.log('req.headers.authorization', req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const data = TokenService.validateAccess(token);
        req.user = data;
        next();
    } catch (e) {
        res.status(401).json({message: "Unauthorized"});
    }
}