const Post = require('../models/Post')
const Option = require('../models/Option')

module.exports.create = async (req, res) => {
  const candidate = await Post.findOne({slug: req.body.slug})

  if (candidate) {
    res.status(409).json({message: 'Пост с таким URL уже существует.'})
  } else {
    const categories = req.body.categories.split(',')
    const post = new Post({
      title: req.body.title,
      slug: req.body.slug,
      categories: categories,
      order: req.body.order,
      text: req.body.text,
      description: req.body.description,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      imageUrl: `/${req.file.filename}`
    })
  
    try {
      await post.save()
      res.status(201).json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1})
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByPageNumber = async (req, res) => {
  try {
    const postPerPage = await Option.findOne({title: 'post_per_page'})
    const count = +postPerPage.value
    let from = (req.params.page - 1) * count
    if (from < 0) from = 0
    let to = Number(from + count)
    const posts = await Post.find().sort({date: -1})
    const result = {}
    if (posts.length <= count) {
      result.posts = posts
    } else {
      result.posts = posts.slice(from, to)
    }
    result.pages = Math.ceil(posts.length / count)
    res.json(result)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByCategory = async (req, res) => {
  try {
    const posts = await Post.find({categories: req.params.id}).sort({order: 1})
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({slug: req.params.slug})
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const candidate = await Post.findOne({slug: req.body.slug})

  if (candidate && String(candidate._id) !== String(req.params.id)) {
    res.status(409).json({message: 'Пост с таким URL уже существует.'})
  } else {
    const categories = req.body.categories.split(',')
    const $set = {
      title: req.body.title,
      slug: req.body.slug,
      categories: categories,
      order: req.body.order,
      text: req.body.text,
      description: req.body.description,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
    }
    if (req.file) {
      $set['imageUrl'] = `/${req.file.filename}`
    }
    try {
      const post = await Post.findOneAndUpdate({
        _id: req.params.id
      }, {$set}, {new: true})
      res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({_id: req.params.id})
    res.json({message: 'Пост удален'})
  } catch (e) {
    res.status(500).json(e)
  }
}
