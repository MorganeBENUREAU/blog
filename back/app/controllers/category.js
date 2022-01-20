const { categoryDataMapper } = require('../dataMappers');

const categoryController = {

    async allCategories (_, response, next) {

        try {

            const category = await categoryDataMapper.getAll();

            // if there is data, we respond with it; if not, we return next()
            if (category) {
                response.status(200).json(category);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    },

    async getOneCategories (request, response, next) {

        try {
            const category = await categoryDataMapper.getById(request.params.id);

            if(!category){
                return next();
            };

            response.json(category);

        } catch (error) {
            console.error(error);
            response.json({ data: [], error: `A servor error occurred, please try again later`});
        };
    },

    async addCategory (request, response, next) {

        try {

            const newCategory = await categoryDataMapper.addCategory(request.body);

            if(!newCategory){
                return next();
            };
        
            response.status(201).json({ newCategory });

        } catch (error) {
            console.error(error);

            if(error.code === '23505'){
                return response.status(400).json({data: [], error: `Cette catégory existe déjà dans la base donnée, veuillez utiliser une catégory différente`});
            };

            response.status(500).json({ error: error.message });
        }
    },

    async updateCategory (request, response, next) {

        try {

            const category = await categoryDataMapper.updateCategory({...request.body, id: request.params.id});

            if(!category){
                return next();
            };

            response.json({ category });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    async deleteOneCategory (request, response, next) {

        try {

            const category = await categoryDataMapper.deleteCategory(request.params.id);
            
            // this check is to ensure we can't delete a comment twice; we return next() if there is no result
            if (category.rowCount > 0) {
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

module.exports = categoryController;