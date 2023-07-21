// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


// const data = fs.readFileSync('./files/starter.txt')
// console.log('data: ', data.toString());

// console.log('__dirname: ', __dirname, __filename);
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log('data', data);
// })

//callback hell

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "I'm fine what about you ", (err) => {
//     if (err) throw err
//     console.log('read complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), "append file add text in existing if filw is not exist then it's create new one", (err) => {
//         if (err) throw err
//         console.log('append complete');
//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'renamed.txt'), (err) => {
//             if (err) {
//                 throw err
//             }
//             console.log('rename done')
//         })
//     })
// })


const filesOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'))
        console.log('data: ', data.toString());
        // await fsPromises.unlink(path.join(__dirname, 'files', 'promiseWrite.txt')) //delete file
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), "this create ny the fspromisese")
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), "\n add line using fs append")
        const newdata = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'utf-8')
        console.log('newdata: ', newdata);
        // console.log(await fsPromises.access(path.join(__dirname, 'files', 'promiseWrite.txt')))

    } catch (error) {
        throw error
    }
}

filesOps()
//got uncaugt error then exit 
process.on('uncaughtException', (error) => {
    console.log('error uncaughtException: ', error);
    process.exit(1)

})
