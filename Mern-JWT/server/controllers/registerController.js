const bcrypt = require('bcrypt')
const User = require('../model/user')

const handleNewUser = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'user and password required' })
    const duplicate = await User.findOne({ username: user }).exec()
    if (duplicate) return res.sendStatus(409)
    try {
        //encrypt password
        const hasedpwd = await bcrypt.hash(password, 10)
        //store user
        const result = await User.create({ 'username': user, "password": hasedpwd })
        res.status(201).json({ 'success': `new user ${user} create` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}


module.exports = { handleNewUser }