const userController = require('./user');
const errorController = require('./404');
const postController = require('./post');
const commentController = require('./comment');
const categoryController = require('./category');

module.exports = {
    userController,
    errorController,
    postController,
    commentController,
    categoryController

};