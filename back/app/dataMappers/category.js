const client = require('../client');

const categoryDataMapper = {

    async getAll () {
        const result = await client.query('SELECT * FROM category');
        return result.rows;
    },

    async getById (id) {
        const result = await client.query('SELECT * FROM category  WHERE id = $1', [id]);
        return result.rows[0];
    },

    async addCategory (data) {
        const result = await client.query(`INSERT INTO category (label) VALUES ($1) RETURNING *`, [data.label]);

        return result.rows[0];
    },

    async updateCategory (data) {
        const result = await client.query(`UPDATE category SET label = $1 WHERE id = $2 RETURNING * `, [data.label, data.id]);

        return result.rows[0];
    }, 

    async deleteCategory (id) {
        const result = await client.query(`DELETE FROM category WHERE id = $1`, [id]);
        return result;
    }

};

module.exports = categoryDataMapper;