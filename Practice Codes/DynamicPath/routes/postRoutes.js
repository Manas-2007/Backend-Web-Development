const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// Add post
router.post('/posts/add', postController.addPost);

// Get all posts
router.get('/posts', postController.getAllPosts);

// Get single post (dynamic)
router.get('/posts/:id', postController.getPostById);

// Delete post (dynamic)
router.get('/posts/delete/:id', postController.deletePost);

// Stats
router.get('/stats', postController.getStats);

module.exports = router;