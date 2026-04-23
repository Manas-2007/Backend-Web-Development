const Post = require('../models/postModel');

// Add Post
exports.addPost = (req, res) => {
    Post.add(req.body);
    res.redirect('/');
};

// Get All Posts
exports.getAllPosts = (req, res) => {
    res.json(Post.getAll());
};

// Get Single Post
exports.getPostById = (req, res) => {
    const post = Post.getById(req.params.id);

    if (!post) {
        return res.send("Post not found!");
    }

    res.json(post);
};

// Like Post
exports.likePost = (req, res) => {
    Post.like(req.params.id);
    res.json({ message: "Liked 👍" });
};

// Add Comment
exports.addComment = (req, res) => {
    Post.comment(req.params.id, req.body.comment);
    res.json({ message: "Comment added 👍" });
};