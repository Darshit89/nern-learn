const express = require('express');
const path = require('path');


const router = express.Router()

router.get('/(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})
router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})
router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page')
})
router.get('/hello(.html)?', (req, res, next) => {
    next()
}, (req, res) => {
    res.send("how are you mf")
})


module.exports = router  