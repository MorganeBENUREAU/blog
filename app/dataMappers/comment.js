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

    async add(data, postId) {
        const result = await client.query(`INSERT INTO comment (comment, post_id) VALUES ($1, $2) RETURNING *`, [data.comment, postId]);

        return result.rows[0];
    },

    async modify(data, commentId) {
        const result = await client.query(`UPDATE comment SET comment = $1 WHERE id = $2 RETURNING *`, [data.comment, commentId]);

        return result.rows[0];
    },

    async delete(commentId) {
        const result = await client.query(`DELETE FROM comment WHERE id = $1`, [commentId]);

        return result;
    }

};

module.exports = commentDataMapper;