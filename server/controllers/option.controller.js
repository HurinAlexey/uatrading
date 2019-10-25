const Option = require('../models/Option')

module.exports.create = async (req, res) => {
  const candidate = await Option.findOne({title: req.body.title})

  if (candidate) {
    res.status(409).json({message: 'Опция с таким названием уже существует.'})
  } else {
    const option = new Option({
      title: req.body.title,
      value: req.body.value
    })

    await option.save()
    res.status(201).json(option)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const options = await Option.find()
    res.json(options)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByTitle = async (req, res) => {
  try {
    const option = await Option.findOne({title: req.params.title})
    if (option) {
        res.json(option)
    } else {
        res.status(404).json({message: 'Данное значение не найдено.'})
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    value: req.body.value
  }
  try {
    const option = await Option.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})
    res.json(option)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Option.deleteOne({_id: req.params.id})
    res.json({message: 'Опция удалена!'})
  } catch (e) {
    res.status(500).json(e)
  }
}
