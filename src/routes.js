const express = require("express");
const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ToolController = require("./controllers/ToolController");

/*
 * To check if API is online
 */
routes.get("/", (req, res) => res.json({ api_status: "ok" }));

/*
 * User creation
 */
routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

/*
 * Tool endpoints
 */
routes.get("/tools", ToolController.index);
routes.get("/tools/:id", ToolController.show);

// Authenticated only
routes.use(authMiddleware);

routes.post("/tools", ToolController.store);
routes.put("/tools/:id", ToolController.update);
routes.delete("/tools/:id", ToolController.destroy);

module.exports = routes;
