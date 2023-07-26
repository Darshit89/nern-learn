const userDB = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }
}
var jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cokkies = req.cookies
    if (!cokkies?.jwt) return res.sendStatus(401)
    const refreshToken = cokkies?.jwt

    const userFound = userDB.users.find(person => {
        return person.refreshToken === refreshToken
    })
    if (!userFound) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || userFound.username !== decoded.username) {
                return res.sendStatus(403)
            }
            const acessToken = jwt.sign({ "userInfo": { "username": userFound.username, "roles": Object.values(userFound.roles) } }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '50s' })
            res.json({ acessToken })
        })
}

module.exports = { handleRefreshToken }