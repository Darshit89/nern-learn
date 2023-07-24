const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000
const app = express()

app.get('/(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect('/new-page')
})

app.listen(PORT, () => console.log(`Server runing on ${PORT}`))
