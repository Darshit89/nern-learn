const userDB = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }
}
const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'user and password required' })

    const userFound = userDB.users.find(person => {
        return person.username === user
    })
    if (!userFound) {
        return res.sendStatus(401)
    }

    const match = await bcrypt.compare(password, userFound.password)
    if (match) {
        const acessToken = jwt.sign({ "username": userFound.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )
        const refreshToken = jwt.sign({ "username": userFound.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        const otherUser = userDB.users.filter(person => {
            return person.username !== userFound.username
        })

        //saving refresh token
        userDB.setUser([...otherUser, { ...userFound, refreshToken }])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.users))
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true })
        res.json({ acessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }