const eventEmmiter = require('events');
const { logEventes } = require('./logEvents');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// class Emmiter extends eventEmmiter { }
// const emitter = new Emmiter()


const PORT = process.env.PORT || 3000
const serveFile = async (filePath, contentType, response) => {
    const data = await fsPromises.readFile(filePath, 'utf-8')
    try {
        console.log('data: ', data);
        response.writeHead(200, { 'content-Type': contentType })
        response.end(data)

    } catch (error) {
        console.log(error)
        response.statusCode = 500
        response.end(data)
    }
}
const server = http.createServer((req, res) => {
    let extension = path.extname(req.url)
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'text/javascripe'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.jpg':
            contentType = 'image/jpeg'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }

    let filePath =
        ((contentType === 'text/html' && req.url === '/') || (contentType === 'text/html' && req.url.slice(-1) === '/')) ? path.join(__dirname, 'views', 'index.html') : contentType === 'text/html' ? path.join(__dirname, 'views', req.url) : path.join(__dirname, req.url)

    if (!extension && req.url.slice(-1) !== '/') {
        filePath += '.html'
    }

    const fileExist = fs.existsSync(filePath)
    if (fileExist) {
        serveFile(filePath, contentType, res)
    } else {

        console.log('path.parse(filePath).base: ', path.parse(filePath).base);
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { "location": '/new-page.html' })
                res.end()
                break;
            case 'xxx.html':
                res.writeHead(301, { "location": '/' })
                res.end()
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
                break;
        }
    }
})


server.listen(PORT, () => console.log(`Server runing on ${PORT}`))




// emitter.on('log', (message) => {
//     logEventes(message)
// })

// setTimeout(() => {
//     emitter.emit('log', 'log event emmited')
// }, 2000);