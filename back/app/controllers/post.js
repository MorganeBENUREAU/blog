const { postDataMapper } = require('../dataMappers');

const postController = {

    async allPosts (_, response, next) {

        try {

            const posts = await postDataMapper.getAll();

            // if there is data, we respond with it; if not, we return next()
            if (posts) {
                response.status(200).json(posts);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    async getOnePost (request, response, next) {

        try {
            const post = await postDataMapper.getById(request.params.id);

            if(!post){
                return next();
            };

            response.status(200).json(post);

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
        
    },


    async addPost(request, response, next) {

        try {

            const newPost = await postDataMapper.addPost(request.body);

            if(!newPost){
                return next();
            };
        
            response.status(201).json({ newPost });

        } catch (error) {
            console.error(error);

            if(error.code === '23505'){
                return response.status(400).json({data: [], error: `Ce post existe déjà dans la base donnée, veuillez faire un post différent`});
            };

            response.status(500).json({ error: error.message });
        };
    },


     async updatePost(request, response, next) {

        try {

            const post = await postDataMapper.updatePost({...request.body, id: request.params.id});

            if(!post){
                return next();
            };

            response.status(200).json({ post });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    async deleteOnePost(request, response){

        try {

            const post = await postDataMapper.deleteOnePost(request.params.id);

            response.status(204).json('Post bien supprimé');
            
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    }
};

module.exports = postController;