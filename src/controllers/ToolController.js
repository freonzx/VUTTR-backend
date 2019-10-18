const Tool = require('../models/Tool')

class ToolController {
    async index(req, res) {
        const filters = {}
        if (req.query.tag) {
            filters.tags = new RegExp(req.query.tag, 'i')
        }

        const tools = await Tool.find(filters)

        return res.json(tools)
    }

    async store(req, res) {
        const tool = await Tool.create(req.body)

        return res.status(201).json(tool)
    }

    async show(req, res) {
        const tool = await Tool.findById(req.params.id)

        return res.json(tool)
    }

    async update(req, res) {
        const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        return res.json(tool)
    }

    async destroy(req, res) {
        await Tool.findByIdAndDelete(req.params.id)

        return res.status(204).send()
    }
}

module.exports = new ToolController()
