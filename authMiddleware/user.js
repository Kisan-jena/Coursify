const jwt = require("jsonwebtoken");
JWT_SECRET="Secret"

function user_auth_middleware(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    user_auth_middleware,
    JWT_SECRET
}