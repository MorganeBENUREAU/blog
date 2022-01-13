const client = require('../client');

const userDataMapper = {

    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    async findById(id) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);
        return result.rows[0];
    },

    async modifyUser(user, id) {
        let query = `UPDATE "user" SET `;
        const values = [];

        const keys = Object.keys(user);

        for (let i = 0; i < keys.length; i++) {
            query += `"${keys[i]}" = $${i + 1}, `;
            values.push(user[keys[i]]);
        };

        query += `updated_at = now() WHERE id = $${keys.length + 1} RETURNING *;`;
        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    },

    async findOne(email) {
        console.log(email);
        const result = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
        return result.rows[0];
    },

    async updatePassword(password, id) {
        const result = await client.query('UPDATE "user" SET password = $1 WHERE id = $2 RETURNING *', [password, id]);
        return result.rows[0];
    },

    async updateUser(user, id) {
        const result = await client.query('UPDATE "user" SET first_name = $1, last_name = $2, email = $3, updated_at = now() WHERE id = $4 RETURNING *', [user.first_name, user.last_name, user.email, id]);
        return result.rows[0];
    },

};

module.exports = userDataMapper;