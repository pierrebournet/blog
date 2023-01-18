class CommentaryServices {
    async getByCommentary(commentary) { 
        const data = await client.query('SELECT * FROM commentary WHERE users_id= $1', [users_id]);
console.log(data);
        if (data.rowCount > 0) {
            return data.rows[0]
        }

        return undefined
    }
}

module.exports = CommentaryServices