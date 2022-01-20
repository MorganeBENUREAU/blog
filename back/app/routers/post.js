const express = require('express');
const router = express.Router();

const { postController } = require('../controllers');


// get all posts
router.route('/post')
    .get(postController.allPosts)
    .post(postController.addPost);

// get one post
router.route('/post/:id(\\d+)')
    .get(postController.getOnePost)
    .patch(postController.updatePost)
    .delete(postController.deleteOnePost);


module.exports = router;