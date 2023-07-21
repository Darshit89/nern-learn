const eventEmmiter = require('events');
const { logEventes } = require('./logEvents');

class myEmmiter extends eventEmmiter { }
const emitter = new myEmmiter()

emitter.on('log', (message) => {
    logEventes(message)
})

setTimeout(() => {
    emitter.emit('log', 'log event emmited')
}, 2000);