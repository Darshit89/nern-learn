const wishList = ['http://localhost:3000/', 'https://web.postman.co']
const corsOption = {
    origin: (origin, callback) => {
        if (wishList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = { corsOption, wishList }