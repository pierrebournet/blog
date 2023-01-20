
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
        const data = await client.query('SELECT * FROM commentary WHERE article_id=$1', [article_id]);
        console.log(data.rows);
        if (data.rowCount > 0) {
            return data.rows
        }
        return undefined
    }


    async addCommentary(title, content, articles_id , users_id) {
        const data = await client.query('INSERT INTO commentary (content, users_id, article_id, title) VALUES ($1, $2, $3,$4 ) RETURNING *', [content, users_id, articles_id, title]);
        console.log(data.rows[0]);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }

    async editCommentary(commentary_id, content, title) {
        const data = await client.query('UPDATE commentary SET content=$1, title=$2, update_date=NOW() WHERE id = $3 RETURNING *', [content,title, commentary_id]);
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