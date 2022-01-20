const express = require('express');

const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');
const categoryRouter = require('./category');

const { errorController, userController } = require('../controllers');

const router = express.Router();


router.use(userRouter);
router.use(postRouter);
router.use(commentRouter);
router.use(categoryRouter);


router.route('/signup')
    .post(userController.registerSave);


router.route('/login')
    .post(userController.checkLogin);


router.get('/logout', userController.logout);

    
router.use(errorController.notFoundResource);


module.exports = router;