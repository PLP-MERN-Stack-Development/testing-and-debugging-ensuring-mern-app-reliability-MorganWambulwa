// server/src/controllers/postsController.js
const Post = require('../models/Post');

async function createPost(req, res, next) {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Validation failed: title, content and category are required' });
    }
    const slug = (title || 'post').toLowerCase().replace(/\s+/g, '-').slice(0, 50) + '-' + Date.now().toString().slice(-4);
    const author = req.user && req.user.id ? req.user.id : null;
    const newPost = await Post.create({ title, content, category, author, slug });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function getPosts(req, res, next) {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) { next(err); }
}

async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(post);
  } catch (err) { next(err); }
}

async function updatePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    // ensure author
    if (!req.user || req.user.id.toString() !== post.author.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const updates = req.body;
    Object.assign(post, updates);
    await post.save();
    res.status(200).json(post);
  } catch (err) { next(err); }
}

async function deletePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (!req.user || req.user.id.toString() !== post.author.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await post.remove();
    res.status(200).json({ success: true });
  } catch (err) { next(err); }
}

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
