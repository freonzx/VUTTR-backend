const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.promise = global.Promise

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

module.exports = {
    setupDB(databaseName) {
        // Connect to Mongoose
        beforeAll(async () => {
            const url = `mongodb+srv://freonzx:235689a@cluster0-a4fmk.mongodb.net/${databaseName}?retryWrites=true&w=majority`
            await mongoose.connect(url, { useNewUrlParser: true })
        })

        // Cleans up database between each test
        afterEach(async () => {
            await removeAllCollections()
        })

        // Disconnect Mongoose
        afterAll(async () => {
            await mongoose.connection.close()
        })
    },
}
