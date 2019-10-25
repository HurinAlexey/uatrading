const Meta = require('../models/Meta')

module.exports.create = async (req, res) => {
  const candidate = await Meta.findOne({page: req.body.page})

  if (candidate) {
    res.status(409).json({message: 'Мета-данные для данной страницы уже существуют.'})
  } else {
    const meta = new Meta({
      page: req.body.page,
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.keywords
    })
  
    try {
      await meta.save()
      res.status(201).json(meta)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const metaData = await Meta.find().sort({date: -1})
    res.json(metaData)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const meta = await Meta.findById(req.params.id)
    res.json(meta)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByPageName = async (req, res) => {
  try {
    const meta = await Meta.findOne({page: req.params.page})
    res.json(meta)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const candidate = await Meta.findOne({page: req.body.page})

  if (candidate && String(candidate._id) !== String(req.params.id)) {
    res.status(409).json({message: 'Мета-данные для данной страницы уже существуют.'})
  } else {
    const $set = {
        page: req.body.page,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords
    }
    try {
      const meta = await Meta.findOneAndUpdate({
        _id: req.params.id
      }, {$set}, {new: true})
      res.json(meta)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Meta.deleteOne({_id: req.params.id})
    res.json({message: 'Мета-данные удалены.'})
  } catch (e) {
    res.status(500).json(e)
  }
}
