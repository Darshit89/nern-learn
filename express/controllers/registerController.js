const userDB = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }
}
const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')



const handleNewUser = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'user and password required' })
    const duplicate = userDB.users.find(person => {
        return person.username === user
    })
    if (duplicate) return res.sendStatus(409)
    try {
        //encrypt password
        const hasedpwd = await bcrypt.hash(password, 10)
        //store user
        const newUser = { 'username': user, "password": hasedpwd }
        userDB.setUser([...userDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.users)
        )
        res.status(201).json({ 'success': `new user ${user} create` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}


module.exports = { handleNewUser }