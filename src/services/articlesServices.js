class ArticlessServices {
    async getByArticles(articles) { 
        const data = await client.query('SELECT * FROM articles WHERE users_id = $1', [users_id]);
console.log(data);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }
}

module.exports = ArticlessServices