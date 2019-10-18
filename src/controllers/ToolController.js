const Tool = require('../models/Tool')

class ToolController {
    async store(req, res) {
        const tool = await Tool.create(req.body)

        return res.status(201).json(tool)
    }
}

module.exports = new ToolController()
