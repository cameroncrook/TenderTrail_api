const Util = {}

Util.checkLogin = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.status(401).send("Unathorized: User not authenticated");
    }
}

module.exports = Util