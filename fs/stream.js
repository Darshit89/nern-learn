const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'files', 'promiseWrite.txt'), { encoding: 'utf-8' })
const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'transfer.txt'))

// readStream.on('data', (filecontent) => {
//     writeStream.write(filecontent)
// })

readStream.pipe(writeStream)
