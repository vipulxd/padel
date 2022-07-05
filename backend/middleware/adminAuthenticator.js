const jwt = require("jsonwebtoken");


const verifyAdminToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        if (req.originalUrl.includes('admin')) {
            if (decoded.role !== 'ADMIN') {
                return res.status(400).send({message: "Unauthorized"})
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyAdminToken;