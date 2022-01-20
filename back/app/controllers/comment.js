const { commentDataMapper } = require('../dataMappers');

const commentController = {

    allCommentsForOnePost: async (request, response, next) => {
        try {

            // get post id from url
            const postId = Number(request.params.id);

            // in case the post id isn't a number, we return next()
            if (isNaN(postId)) {
                return next();
            };

            const comments = await commentDataMapper.findAll(postId);

            // if there is data, we respond with it; if not, we return next()
            if (comments) {
                response.status(200).json(comments);
            } else {
                return next();
            };
        } catch {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    addComment: async (request, response, next) => {
        try {
            // create new data with request.body
            const newData = request.body;

            // get comment id from url
            const postId = Number(request.params.id);

            // in case the comment id isn't a number, we return next()
            if (isNaN(postId)) {
                return next();
            };

            // add a new comment thanks to request.body and comment id
            const newComment = await commentDataMapper.add({ ...newData }, postId);


            // if there is no newComment, we return next()
            if (!newComment) {
                return next();
            };

            // if all goes well, we respond with the new comment
            response.status(201).json({ data: newComment });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    updateComment: async (request, response, next) => {
        try {
            // create new data with request.body
            const newData = request.body;

            // get post id from url
            const postId = Number(request.params.id);

            // in case the post id isn't a number, we return next()
            if (isNaN(postId)) {
                return next();
            };

            // get comment id from url
            const commentId = Number(request.params.commentId);

            // in case the comment id isn't a number, we return next()
            if (isNaN(commentId)) {
                return next();
            };

            // modify comment thanks to new data and comment id
            const modifiedComment = await commentDataMapper.modify({ ...newData }, commentId);

            // if there is no modifiedComment, we return next()
            if (!modifiedComment) {
                return next();
            };

            // if all goes well, we respond with the modified comment
            response.status(200).json({ modifiedComment });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    deleteComment: async (request, response, next) => {
        try {

            // get parent id from url
            const postId = Number(request.params.id);

            // in case the post id isn't a number, we return next()
            if (isNaN(postId)) {
                return next();
            };

            // get comment id from url
            const commentId = Number(request.params.commentId);

            // in case the comment id isn't a number, we return next()
            if (isNaN(commentId)) {
                return next();
            };

            // delete comment thanks to its id
            const result = await commentDataMapper.delete(commentId);

            // this check is to ensure we can't delete a comment twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Commentaire bien supprimé');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    }

};

module.exports = commentController;