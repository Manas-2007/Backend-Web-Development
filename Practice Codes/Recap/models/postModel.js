const posts = [];

module.exports = {
    getAll: () => posts,

    getById: (id) => posts[id],

    add: (data) => {
        posts.push({
            Title: data.title,
            Description: data.content,
            Likes: 0,
            Comments: []
        });
    },

    like: (id) => {
        if (posts[id]) {
            posts[id].Likes++;
        }
    },

    comment: (id, comment) => {
        if (posts[id]) {
            posts[id].Comments.push(comment);
        }
    }
};