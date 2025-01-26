const jwt = require("jsonwebtoken");
JWT_SECRET="AdminSecret"

function admin_auth_middleware(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)
    const response = jwt.verify(token, JWT_SECRET);
    console.log(response)

    if (response) {
        req.userId = response.id;
        console.log("ye jisne login kiya uska id:" + req.userId)
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    admin_auth_middleware,
    JWT_SECRET
}