const jwt = require('jsonwebtoken');



function auth(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Token tapılmadı" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token formatı səhvdir" });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(403).json({ message: "Keçərsiz token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Auth xətası", error: error.message });
    }
}

function isAdmin(req, res, next) {

    if (req.user && req.user.role && req.user.role.toUpperCase() === "ADMIN") {
        return next();
    }
    return res.status(403).json({ success: false, message: "Bu əməliyyat üçün səlahiyyətiniz yoxdur (Admin icazəsi tələb olunur)" });
}

module.exports = { auth, isAdmin };