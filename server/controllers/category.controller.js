const Category = require('../models/Category')

module.exports.create = async (req, res) => {
  const candidate = await Category.findOne({title: req.body.title})

  if (candidate) {
    res.status(409).json({message: 'Такая категория уже существует.'})
  } else {
    const category = new Category({
      title: req.body.title
    })
  
    try {
      await category.save()
      res.status(201).json(category)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const candidate = await Category.findOne({title: req.body.title})

  if (candidate && String(candidate._id) !== String(req.params.id)) {
    res.status(409).json({message: 'Такая категория уже существует.'})
  } else {
    const $set = {
      title: req.body.title
    }
    try {
      const category = await Category.findOneAndUpdate({
        _id: req.params.id
      }, {$set}, {new: true})
      res.json(category)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Category.deleteOne({_id: req.params.id})
    res.json({message: 'Категория удалена'})
  } catch (e) {
    res.status(500).json(e)
  }
}
