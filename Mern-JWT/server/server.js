require('dotenv').config();
const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents');
const { erroHandler } = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const { credentials } = require('./middleware/credential');
const { corsOption } = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');

const PORT = process.env.PORT || 8080
connectDB()
//custom middleware logger
app.use(logger)

// Handle options credentials check - before CORS!	
// and fetch cookies credentials requirement	
app.use(credentials)

//cors third party middlewar
app.use(cors(corsOption))

//built in middleware for handle urlencoded data
app.use(express.urlencoded({ extended: false }))

// build in middleware for json
app.use(express.json())

//middleware for cokkie parser we set the cokkie in header
app.use(cookieParser())
//serve static files
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routers/root'))
app.use('/register', require('./routers/api/register'))
app.use('/auth', require('./routers/api/auth'))
app.use('/refresh', require('./routers/api/refresh'))
app.use('/logout', require('./routers/api/logOut'))

//jwt verfication middleware
app.use(verifyJWT)
app.use('/employees', require('./routers/api/employees'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
    } else {
        res.type('txt').send('4o4 not found')
    }
})

app.use(erroHandler)
mongoose.connection.once('open', () => {
    console.log("connected to mongodb")
    app.listen(PORT, () => console.log(`Server runing on ${PORT}`))
})
