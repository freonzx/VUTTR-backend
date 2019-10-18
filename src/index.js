const server = require('./server')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

// Conecting to DB
mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.listen(3000 || process.env.PORT, () => {
    console.log(`🚀 Server listening at port ${3000 || process.env.PORT}`)
})
