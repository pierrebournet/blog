
const express = require('express');
const client = require('../services/client');
const articlesRouter = express.Router();
const authenticateJWT = require('../middlewares/auth.js')





articlesRouter.get('/', authenticateJWT, async (req, res) => {

    try {
        const data = await client.query('SELECT * FROM articles');

        res.status(200).json(
            {
                status: "success",
                data: data.rows
            }
        )
    }
    catch (err) {
        res.status(500).json(
            {
                status: "fail",
                message: "erreur serveur"
            }
        )
        console.log(err.stack)
    }
})


articlesRouter.get('/:id', async (req, res) => {
    const articlesId = req.params.id

    if (!Number.isNaN(Number(articlesId))) {
        try {
            const data = await client.query('SELECT * FROM articles WHERE id=$1', [articlesId]);
            if (data.rows.length === 1) {
                res.status(200).json(
                    {
                        status: "success",
                        data: data.rows[0]
                    }
                )
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "id ne correspond pas"
                    }
                )
            }
        }
        catch (err) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack)
        }
    }
    else {
        res.status(404).json(
            {
                status: "fail",
                message: "numéro d'ID nécessaire"
            }
        )
    }
})


articlesRouter.post('/', authenticateJWT, async (req, res) => {
    console.log(req.body);

    const mess = req.body.message
    const userId = req.userId

    console.log(mess, userId);

    if (mess && userId != null) {
        try {
            const data = await client.query('INSERT INTO articles (message, user_id) VALUES ($1,$2) returning *', [mess, userId]);

            res.status(201).json(
                {
                    status: "success",
                    message: "message posté avec succés",
                    data: data.rows[0]
                }
            )
        }
        catch (err) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err);
        }
    }
    else {
        res.status(400).json(
            {
                status: "fail",
                message: "message ou id utilisateur obligatoire"
            }
        )
    }
})


articlesRouter.delete('/:id', authenticateJWT, async (req, res) => {
    const deleteId = req.params.id
    const test = req.userId

    if (!Number.isNaN(Number(deleteId))) {
        try {
            const blogbriefData = await client.query('SELECT id,user_id FROM articles WHERE id=$1', [deleteId]);
            if (test !== blogbriefData.rows[0]['userId']) {
                res.status(404).json(
                    {
                        status: "FAIL",
                        message: "suppression non autorisée"
                    }
                )

            }
            else {
                const data = await client.query('DELETE from articles WHERE id= $1', [deleteId])

                if (data.rowCount === 1) {
                    res.status(200).json(
                        {
                            status: "success",
                            message: "article supprimé"
                        }
                    )
                }

                else {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "id ne correspond pas"
                        }
                    )
                }
            }
        }
        catch (err) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack);
        }
    }
    else {
        res.status(404).json(
            {
                status: "fail",
                message: "numéro d'ID nécessaire"
            }
        )
    }


}
)


articlesRouter.put('/:id', async (req, res) => {

    const updateId = req.params.id
    const updateMess = req.body.message
    const updateDone = req.body.done
    const test = req.userId

    if (!Number.isNaN(Number(updateId))) {
        if (updateMess && updateDone !== undefined) {
            if (updateDone === true || updateDone === false) {

                try {
                    const articlesData = await client.query('SELECT id,user_id FROM articles WHERE id=$1', [updateId]);
                    if (test !== articlesData.rows[0]['userId']) {
                        res.status(404).json(
                            {
                                status: "FAIL",
                                message: "update non autorisée"
                            }
                        )

                    }
                    else {
                        const data = await client.query('UPDATE articles SET  done = $3, message = $1 WHERE id = $2 RETURNING *', [updateMess, updateId, updateDone])

                        if (data.rowCount > 0) {
                            res.status(201).json({
                                status: "success", message: "données modifiées", data: data.rows[0]
                            })
                        }
                        else {
                            res.status(404).json(
                                {
                                    status: "FAIL",
                                    message: "Aucun ticket ne correspond à cet id"
                                }
                            )
                        }
                    }
                }
                catch (err) {

                    res.status(500).json(
                        {
                            status: "FAIL",
                            message: "erreur serveur"
                        })
                }
            } else {
                res.status(400).json(
                    {
                        status: "FAIL",
                        message: "Booléen attendu"
                    }
                )
            }
        } else {
            res.status(400).json(
                {
                    status: "FAIL",
                    message: "valeur manquante"
                }
            )
        };

    } else {
        res.status(404).json(
            {
                status: "FAIL",
                message: "Nécessite un nombre valable en tant qu'Id"
            });
    };
});




module.exports = articlesRouter;