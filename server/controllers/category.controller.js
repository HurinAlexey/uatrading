const Snippet = require('../models/Category')


module.exports.create = async (req, res) => {
    const snippet = new Snippet(req.body)

    try {
        snippet.save()
        res.status(201).json(snippet)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.getByTitle = async (req, res) => {
    try {
        await Snippet.findOne({title: req.params.title})
            .then(snippet => {
                res.status(200).json(snippet)
            })
    } catch (err) {
        res.status(500).json(err)
    }
}