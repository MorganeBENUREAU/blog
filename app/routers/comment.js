const express = require('express');
const router = express.Router();

const { commentController } = require('../controllers');


// get all comments for one post
router.route('/post/:id(\\d+)/comment')
    .get(commentController.allCommentsForOnePost)
    .post(commentController.addComment)

router.route('/post/:id(\\d+)/comment/:id(\\d+)')
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment);


module.exports = router;