const express = require('express');
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { erroHandler } = require('./middleware/errorHandler');
const corsOption = require('./config/corsOptions');
const PORT = process.env.PORT || 3000
const app = express()


//custom middleware logger
app.use(logger)
//cors third party middlewar
app.use(cors(corsOption))
//built in middleware for handle urlencoded data
app.use(express.urlencoded({ extended: false }))
// build in middleware for json
app.use(express.json())
//serve static files


app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routers/root'))
app.use('/employees', require('./routers/api/employees'))
app.use('/register', require('./routers/api/register'))
app.use('/auth', require('./routers/api/auth '))




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
