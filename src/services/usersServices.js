const client = require('./client');

class UsersServices {
    async getUserByName(name) {
        const data = await client.query('SELECT * FROM users WHERE name = $1', [name]);
        //console.log("test", data);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async addUser(name, hash) {
<<<<<<< HEAD
        const add=await client.query('INSERT INTO users (name, password) VALUES ($1, $2) returning *', [name, hash]);
        console.log(name, hash)
if (add.rowCount>0)
{
    return add.rows[0]
}
return undefined
=======
        const data = await client.query('INSERT INTO users (name, password) VALUES ($1,$2)', [name, hash]);
        //console.log(name, hash)
        if (data.rowCount > 0) {
            return data.rows[0]
        }
        return undefined
>>>>>>> 37bab175ced70c9a743d8452af6fe3e7cb82edab
    }
}


module.exports = UsersServices