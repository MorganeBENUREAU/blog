const client = require('../client');

const commentDataMapper = {

    async findAll(postId) {
        const result = await client.query('SELECT * FROM "comment" WHERE post_id = $1', [postId]);

        return result.rows[0];
    },

    async findById(id) {
        const result = await client.query('SELECT * FROM "comment" WHERE id = $1', [id]);

        return result.rows[0];
    },

    async add(data, id) {
        const result = await client.query(`INSERT INTO comment (comment, post_id) VALUES ($1, $2) RETURNING *`, [data.comment, id]);

        return result.rows[0];
    },

    async modify(data) {
        const result = await client.query(`UPDATE comment SET comment = $1 WHERE id = $2 RETURNING *`, [data.comment, data.id]);

        return result.rows[0];
    },

    async delete(id) {
        const result = await client.query(`DELETE FROM comment WHERE id = $1`, [id]);

        return result.rows[0];
    }

};

module.exports = commentDataMapper;