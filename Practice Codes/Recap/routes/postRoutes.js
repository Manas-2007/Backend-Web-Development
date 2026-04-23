const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/posts/add', postController.addPost);

router.get('/posts', postController.getAllPosts);

router.get('/posts/:id', postController.getPostById);

router.get('/posts/like/:id', postController.likePost);

router.post('/comment/add/:id', postController.addComment);

module.exports = router;