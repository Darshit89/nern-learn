const express = require('express');
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { erroHandler } = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000
const app = express()


//custom middleware logger
app.use(logger)
//cors third party middlewar
const wishList = ['http://localhost:3000/', 'https://web.postman.co']
const corsOption = {
    origin: (origin, callback) => {
        console.log('origin: ', origin);
        if (wishList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))
//built in middleware for handle urlencoded data
app.use(express.urlencoded({ extended: false }))
// build in middleware for json
app.use(express.json())
//serve static files
app.use(express.static(path.join(__dirname, 'public')))


app.get('/(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page')
})
app.get('/hello(.html)?', (req, res, next) => {
    next()
}, (req, res) => {
    res.send("how are you mf")
})

app.all('*', (req, res) => {
    console.log('req.accepts', req.accepts('html'));
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

app.listen(PORT, () => console.log(`Server runing on ${PORT}`))
