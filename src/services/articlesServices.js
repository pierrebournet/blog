const client = require('./client');

class ArticlesServices {
    async getAllArticles() {
        const data = await client.query('SELECT * FROM articles ');
        console.log(data.rows);
        if (data.rowCount > 0) {
            return data.rows
        }

        return undefined
    }

    async getArticlesById(article_id) {
        const data = await client.query('SELECT * FROM articles WHERE id=$1',[article_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async addArticles(title, content, users_id) {
        const data = await client.query('INSERT INTO articles (title, content, users_id, date_created, date_modified) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',[title, content, users_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async editArticles(article_id,users_id,title,content) {
        console.log(article_id,users_id,title,content);
        const data = await client.query('UPDATE articles SET title = $1, content=$2, date_modified=NOW() WHERE id = $3 AND users_id = $4 RETURNING *',[title,content,article_id,users_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async deleteArticles(article_id,users_id) {
        const data = await client.query('DELETE FROM articles WHERE id = $1 AND users_id = $2 RETURNING *',[article_id,users_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }
}



module.exports = ArticlesServices