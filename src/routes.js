const express = require('express')
const controllers = require('./controllers/')
const routes = express.Router()

// To check if API is online
routes.get('/', (req, res) => res.json({ api_status: 'ok' }))

/*
 * Tool endpoints
 */
routes.post('/tools', controllers.ToolController.store)

module.exports = routes
