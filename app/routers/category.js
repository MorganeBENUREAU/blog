const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');


// get all posts
router.route('/category')
    .get(categoryController.allCategories)
    .post(categoryController.addCategory);

// get one post
router.route('/category/:id(\\d+)')
    .get(categoryController.getOneCategories)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteOneCategory);


module.exports = router;