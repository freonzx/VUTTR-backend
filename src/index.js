const server = require('./server')

server.listen(4000 || process.env.PORT, () => {
    console.log(`🚀 Server listening at port ${4000 || process.env.PORT}`)
})
