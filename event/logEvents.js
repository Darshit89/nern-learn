const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;
console.log()


const logEventes = async (message) => {
    const logItem = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            fsPromise.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromise.appendFile(path.join(__dirname, 'logs', 'evenLogs.txt'), logItem)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { logEventes }
// logEventes()