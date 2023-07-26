const { wishList } = require("../config/corsOptions");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (wishList.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}
module.exports = { credentials }	