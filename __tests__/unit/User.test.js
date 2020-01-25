const mongoose = require('mongoose')
const User = require('../../src/models/User')
const { setupDB } = require('../test-setup')

setupDB('testing')

const userData = {
    name: 'Freon',
    email: 'test@test.com',
    password: '123123',
}

describe('User model unit test', () => {
    it('Create & save user successfully', async () => {
        const validUser = new User(userData)
        const savedUser = await validUser.save()
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined()
        expect(savedUser.email).toBe(userData.email)
        expect(savedUser.password).not.toBe(userData.password)
    })

    it('Insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new User({
            name: 'Freon',
            email: 'test@test.com',
            password: '123123',
            avatar: 'test',
        })
        const savedUserWithInvalidField = await userWithInvalidField.save()
        expect(savedUserWithInvalidField._id).toBeDefined()
        expect(savedUserWithInvalidField.avatar).toBeUndefined()
    })

    it('Create user without required field should fail', async () => {
        const userWithoutRequiredField = new User({ name: 'Freon' })
        let err
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save()
            error = savedUserWithoutRequiredField
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.email).toBeDefined()
    })
})
