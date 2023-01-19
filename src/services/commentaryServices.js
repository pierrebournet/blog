
const client = require('./client');

class CommentaryServices {
    async getAllCommentary() {
        const data = await client.query('SELECT * FROM commentary');
        console.log(data.rows);
        if (data.rowCount > 0) {
            return data.rows
        }

        return undefined
    }

    async getCommentaryById(commentary_id) {
        const data = await client.query('SELECT * FROM commentary WHERE id=$1', [commentary_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async getCommentaryByArticleId(article_id) {
        const data = await client.query('SELECT * FROM commentary WHERE articles_id=$1', [article_id]);
        console.log(data.rows);
        if (data.rowCount > 0) {
            return data.rows
        }
        return undefined
    }


    async addCommentary(content, users_id, articles_id) {
        const data = await client.query('INSERT INTO commentary (content, users_id, articles_id, date_created, date_modified) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *', [content, users_id, articles_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async editCommentary(commentary_id, content) {
        const data = await client.query('UPDATE commentary SET content=$1, date_modified=NOW() WHERE id = $2 RETURNING *', [content, commentary_id]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async deleteCommentary(commentary_id) {
        const data = await client.query('DELETE FROM commentary WHERE id = $1 RETURNING *', [commentary_id]);
        console.log(data.rowCount);
        return data.rowCount
    }

    async deleteCommentaryByArticleId(article_id) {
        const data = await client.query('DELETE FROM commentary WHERE articles_id = $1 RETURNING *', [article_id]);
        console.log(data.rowCount);
        return data.rowCount
    }



}

module.exports = CommentaryServices