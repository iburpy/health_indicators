const authRequired = (req, res, next) => {
    console.log(req.headers.cookies);
    next();
};

module.exports = { authRequired };