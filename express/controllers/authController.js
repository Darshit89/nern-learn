const userDB = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }
}
const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')



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
        res.json({ 'success': `user ${user} is logged in` })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }