const express = require("express");
const validate = require("express-validation");
const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

/*
 * Controllers
 */
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ToolController = require("./controllers/ToolController");

/*
 * Validators
 */
const UserValidator = require("./validators/User");
const ToolValidator = require("./validators/Tool");
const SessionValidator = require("./validators/Session");

/*
 * To check if API is online
 */
routes.get("/", (req, res) => res.json({ api_status: "ok" }));

/*
 * User creation
 */
routes.post("/users", validate(UserValidator), UserController.store);
routes.post("/sessions", validate(SessionValidator), SessionController.store);

/*
 * Tool endpoints
 */
routes.get("/tools", ToolController.index);
routes.get("/tools/:id", ToolController.show);

/*
 * Authenticated only
 */

routes.use(authMiddleware);

routes.post("/tools", validate(ToolValidator), ToolController.store);
routes.put("/tools/:id", validate(ToolValidator), ToolController.update);
routes.delete("/tools/:id", ToolController.destroy);

module.exports = routes;
