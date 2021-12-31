const express = require('express');

// const adminRouter = require('./admin');
// const { errorController, userController, authController } = require('../controllers');

const router = express.Router();

// router.use(adminRouter);

router.use(errorController.notFoundResource);

module.exports = router;