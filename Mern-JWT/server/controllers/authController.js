const User = require('../model/user');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) return res.status(400).json({ 'message': 'user and password required' })

    const userFound = await User.findOne({ username: user }).exec()
    if (!userFound) {
        return res.sendStatus(401)
    }

    const match = bcrypt.compare(password, userFound.password)
    if (match) {
        const acessToken = jwt.sign({ "userInfo": { "username": userFound.username, "roles": Object.values(userFound.roles) } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        )
        //not need to add roles in refresh token eventually refresh token gives a new access token
        const refreshToken = jwt.sign({ "username": userFound.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        //saving refresh token
        userFound.refreshToken = refreshToken
        const result = await userFound.save()
        console.log('result auth: ', result);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ acessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }