const client = require('./client');

class UsersServices {
    async getUserByName(name) {
        const data = await client.query('SELECT * FROM users WHERE name = $1', [name]);
        console.log(data);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async addUser(name, hash) {
        console.log(name, hash)
    }
}

module.exports = UsersServices