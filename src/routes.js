const express = require('express')
const controllers = require('./controllers/')
const authMiddleware = require('./middlewares/auth')
const routes = express.Router()

/*
 * To check if API is online
 */
routes.get('/', (req, res) => res.json({ api_status: 'ok' }))

/*
 * User creation
 */
routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

/*
 * Tool endpoints
 */
routes.get('/tools', controllers.ToolController.index)
routes.get('/tools/:id', controllers.ToolController.show)
// Authenticated only
routes.use(authMiddleware)

routes.post('/tools', controllers.ToolController.store)
routes.put('/tools/:id', controllers.ToolController.update)
routes.delete('/tools/:id', controllers.ToolController.destroy)

module.exports = routes
