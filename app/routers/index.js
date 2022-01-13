const express = require('express');

const userRouter = require('./user');

const { errorController, userController } = require('../controllers');

const router = express.Router();


router.use(userRouter);


router.route('/login')
    .post(userController.checkLogin);


router.get('/logout', userController.logout);

    
router.use(errorController.notFoundResource);


module.exports = router;