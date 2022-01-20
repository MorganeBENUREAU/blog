const client = require('../client');

const postDataMapper = {

    async getAll() {
        const result = await client.query('SELECT * FROM "post"');

        return result.rows;
    },

    async getById(id) {
        const result = await client.query('SELECT * FROM "post" WHERE id = $1', [id]);

        return result.rows[0];
    },

    async addPost(data) {
        const result = await client.query(`INSERT INTO post (title, content, image) VALUES ($1, $2, $3) RETURNING *`, [data.title, data.content, data.image]);

        return result.rows[0];
    },

    async updatePost(data) {
        const result = await client.query(`UPDATE post SET title = $1, content = $2, image = $3 WHERE id = $4 RETURNING *`, [data.title, data.content, data.image, data.id]);

        return result.rows[0];
    },

    async deleteOnePost(id) {
        const result = await client.query(`DELETE FROM post WHERE id = $1`, [id]);

        return result.rows[0];
    }

};

module.exports = postDataMapper;