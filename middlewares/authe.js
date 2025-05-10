const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const token = req.cookies.token; //get token from cookie.
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token using jwt.
        req.user = decoded; //set user to decoded token.
        next(); //call next middleware.
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    
}

module.exports = auth; //exporting auth middleware.