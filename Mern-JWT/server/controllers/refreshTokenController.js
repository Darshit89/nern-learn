const jwt = require('jsonwebtoken');
const User = require('../model/user');

const handleRefreshToken = async (req, res) => {
    const cokkies = req.cookies
    if (!cokkies?.jwt) return res.sendStatus(401)
    const refreshToken = cokkies?.jwt

    const userFound = await User.findOne({ refreshToken }).exec()
    const roles=Object.values(userFound.roles)
    if (!userFound) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || userFound.username !== decoded.username) {
                return res.sendStatus(403)
            }
            const acessToken = jwt.sign({ "userInfo": { "username": userFound.username, "roles": Object.values(userFound.roles) } }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '20s' })
            res.json({ acessToken ,roles:roles})
        })
}

module.exports = { handleRefreshToken }