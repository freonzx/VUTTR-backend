const mongoose = require('mongoose')
const Tool = require('../../src/models/Tool')
const { setupDB } = require('../test-setup')

setupDB('testing')

const toolData = {
    title: 'test',
    link: 'test',
    description: 'test',
    author: '5daa24d12f27f22f903d0573',
    tags: ['test'],
}

describe('Tool model unit test', () => {
    it('Create & save Tool successfully', async () => {
        const validTool = new Tool(toolData)
        const savedTool = await validTool.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedTool._id).toBeDefined()
        expect(savedTool.title).toBe(toolData.title)
        expect(savedTool.link).toBe(toolData.link)
        expect(savedTool.description).toBe(toolData.description)
    })

    it('Insert Tool successfully, but the field does not defined in schema should be undefined', async () => {
        const toolWithInvalidField = new Tool({
            title: 'test',
            link: 'test',
            description: 'test',
            author: '5daa24d12f27f22f903d0573',
            tags: ['test'],
            test: '123',
        })
        const savedToolWithInvalidField = await toolWithInvalidField.save()
        expect(savedToolWithInvalidField._id).toBeDefined()
        expect(savedToolWithInvalidField.test).toBeUndefined()
    })

    it('Create Tool without required field should fail', async () => {
        const toolWithoutRequiredField = new Tool({ title: 'tool' })
        let err
        try {
            const savedToolWithoutRequiredField = await toolWithoutRequiredField.save()
            error = savedToolWithoutRequiredField
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)

        expect(err.errors.description).toBeDefined()
        expect(err.errors.link).toBeDefined()
        expect(err.errors.author).toBeDefined()
    })
})
