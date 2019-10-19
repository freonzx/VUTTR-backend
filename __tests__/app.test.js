// Mongo
const mongoose = require('mongoose')
const databaseName = 'test'
// App
const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
// Models
const User = require('../src/models/User')
const Tool = require('../src/models/Tool')

let token = null

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

// Open connection to test database
beforeAll(async () => {
    const url = `mongodb+srv://freonzx:235689a@cluster0-a4fmk.mongodb.net/${databaseName}?retryWrites=true&w=majority`
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

//Cleans up database between each test
afterEach(async () => {
    await removeAllCollections()
})

afterAll(() => {
    mongoose.connection.close()
})

describe('API is Online', () => {
    it('Gets the test endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        expect(response.body.api_status).toBe('ok')
    })
})

describe('User Registration', () => {
    it('Should save user to database', async done => {
        const res = await request.post('/users').send({
            name: 'Freon',
            email: 'testing@gmail.com',
            password: '123123'
        })

        expect(res.status).toBe(200)

        // Searches the user in the database
        const user = await User.findOne({ email: 'testing@gmail.com' })

        expect(user).toBeTruthy()

        done()
    })
})

describe('Session', () => {
    it('Should be able to get JWT Token', async done => {
        // Register valid user
        let res = await request.post('/users').send({
            name: 'Freon',
            email: 'testing@gmail.com',
            password: '123123'
        })
        expect(res.status).toBe(200)

        // Tries to login and expect token
        res = await request.post('/sessions').send({
            email: 'testing@gmail.com',
            password: '123123'
        })
        expect(res.status).toBe(200)
        expect(res.body.token).toBeTruthy()
        token = res.body.token
        done()
    })
})

describe('Tools', () => {
    it('Should be able to create new post', async done => {
        const res = await request
            .post('/tools')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test',
                link: 'https://test.com',
                description: 'test',
                tags: ['test']
            })

        expect(res.status).toBe(201)
        done()
    })

    it('Should NOT be able to create post unauthorized', async done => {
        const res = await request.post('/tools').send({
            title: 'test',
            link: 'https://test.com',
            description: 'test',
            tags: ['test']
        })

        expect(res.status).toBe(401)
        done()
    })

    it('Should be able to SHOW created Tool', async done => {
        const res = await request
            .post('/tools')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test',
                link: 'https://test.com',
                description: 'test',
                tags: ['test']
            })

        expect(res.status).toBe(201)
        const toolId = res.body._id

        const showResponse = await request.get(`/tools/${toolId}`)

        expect(showResponse.status).toBe(200)
        done()
    })

    it('Should be able to UPDATE created Tool', async done => {
        const res = await request
            .post('/tools')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test',
                link: 'https://test.com',
                description: 'test',
                tags: ['test']
            })

        expect(res.status).toBe(201)
        const toolId = res.body._id

        const update = await request
            .put(`/tools/${toolId}`)
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test123',
                link: 'https://test.com',
                description: 'test',
                tags: ['test']
            })
        const title = update.body.title

        expect(title).toBe('test123')
        done()
    })

    it('Should NOT be able to UPDATE Tool', async done => {
        const res = await request
            .post('/tools')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test',
                link: 'https://test.com',
                description: 'test',
                tags: ['test']
            })

        expect(res.status).toBe(201)
        const toolId = res.body._id

        const update = await request.put(`/tools/${toolId}`).send({
            title: 'test123',
            link: 'https://test.com',
            description: 'test',
            tags: ['test']
        })

        expect(update.status).toBe(401)
        done()
    })
})
