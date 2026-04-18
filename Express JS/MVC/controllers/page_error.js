
exports.page_error = (req, res) => {
    res.status(404).send("<h1>Sorry, this page is NOT FOUND!</h1>");
};