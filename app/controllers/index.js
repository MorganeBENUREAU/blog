const userController = require('./user');
const errorController = require('./404');
const adminController = require('./admin');
// const authController = require('./auth');
// const commentController = require('./comment');
// const recapController = require('./recap');

module.exports = {
    userController,
    errorController,
    adminController

};