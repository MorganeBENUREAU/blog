const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');


// modify password
router.route('/profile/:id(\\d+)/password')
    .patch(userController.updatePassword);


// get user by id and update
router.route('/profile/:id(\\d+)')
    .get(userController.getUserById)
    .patch(userController.updateUser);


module.exports = router;