const express = require('express')
const controllers = require('./controllers/')
const routes = express.Router()

// To check if API is online
routes.get('/', (req, res) => res.json({ api_status: 'ok' }))

/*
 * Tool endpoints
 */
routes.post('/tools', controllers.ToolController.store)
routes.get('/tools', controllers.ToolController.index)
routes.get('/tools/:id', controllers.ToolController.show)
routes.put('/tools/:id', controllers.ToolController.update)
routes.delete('/tools/:id', controllers.ToolController.destroy)

module.exports = routes
