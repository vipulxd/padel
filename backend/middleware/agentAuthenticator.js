const jwt = require("jsonwebtoken");

const config = process.env;

const verifyAgentToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        if (req.originalUrl.includes('agent')) {
            if (decoded.role != 'AGENT') {
                return res.status(400).send({message: "Unauthorized"})
            }
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyAgentToken;