const userDB = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }
}

const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req, res) => {
    const cokkies = req.cookies

    if (!cokkies?.jwt) return res.sendStatus(204)
    const refreshToken = cokkies?.jwt

    //check refresh token in db
    const userFound = userDB.users.find(person => {
        return person.refreshToken === refreshToken
    })
    if (!userFound) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }
    //delete refresh token from db
    const otherUsers = userDB.users.filter(person => {
        return person.refreshToken !== refreshToken
    })
    const currentUser = { ...userFound, refreshToken: '' }

    userDB.setUser([...otherUsers, currentUser])
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(userDB.users))
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(200)
}

module.exports = { handleLogout }