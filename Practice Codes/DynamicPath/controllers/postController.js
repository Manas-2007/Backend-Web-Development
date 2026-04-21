const posts = require('../models/postModel');

// Add post
exports.addPost = (req, res) => {
    posts.push({
        id: posts.length,
        title: req.body.title,
        content: req.body.content
    });

    console.log("Post added:", posts);
    res.redirect('/');
};

// Get all posts
exports.getAllPosts = (req, res) => {
    res.json(posts);
};

// Get single post (dynamic route)
exports.getPostById = (req, res) => {
    const id = req.params.id;
    const post = posts[id];

    if (!post) {
        return res.send("Post not found!");
    }

    res.json(post);
};

// Delete post
exports.deletePost = (req, res) => {
    const id = req.params.id;

    if (!posts[id]) {
        return res.send("Post not found!");
    }

    posts.splice(id, 1);

    res.redirect('/posts');
};

// Stats
exports.getStats = (req, res) => {
    res.send(`
        <center>
            <h2>Total Posts: ${posts.length}</h2>
        </center>
    `);
};