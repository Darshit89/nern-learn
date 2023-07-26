const User = require('../model/user');

const handleLogout = async (req, res) => {
    const cokkies = req.cookies
    console.log('cokkies: ', cokkies);

    if (!cokkies?.jwt) return res.sendStatus(204)
    const refreshToken = cokkies?.jwt
    console.log('refreshToken: ', refreshToken);

    //check refresh token in db
    const userFound = await User.findOne({ refreshToken }).exec()

    if (!userFound) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }
    //delete refresh token from db
    userFound.refreshToken = ''
    const result = await userFound.save()
    console.log('result logout: ', result);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(200)
}

module.exports = { handleLogout }