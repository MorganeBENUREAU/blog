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
        const result = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
        return result.rows[0];
    },

    async updatePassword(password, id) {
        const result = await client.query('UPDATE "user" SET password = $1 WHERE id = $2 RETURNING *', [password, id]);
        return result.rows[0];
    },

    async updateUser(user, id) {
        const result = await client.query('UPDATE "user" SET firstname = $1, lastname = $2, email = $3, updated_at = now() WHERE id = $4 RETURNING *', [user.firstname, user.lastname, user.email, id]);
        return result.rows[0];
    },

    async countEmail (email) {
        const result = await client.query('SELECT COUNT(*) FROM "user" WHERE email = $1', [email]);
        return result.rows[0];
    },

    async insertOne (data) {
        const result = await client.query('INSERT INTO "user" (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *', [data.email, data.password, data.firstname, data.lastname]);

        return result.rows[0];
    },

};

module.exports = userDataMapper;