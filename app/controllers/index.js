const userController = require('./user');
const errorController = require('./404');
const postController = require('./post');
const commentController = require('./comment');
// const authController = require('./auth');
// const commentController = require('./comment');
// const recapController = require('./recap');

module.exports = {
    userController,
    errorController,
    postController,
    commentController

};