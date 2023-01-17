
const express = require('express');
const client = require('../services/client');
const commentaryRouter = express.Router();
const authenticateJWT = require('../middlewares/auth.js')




// Création d'un routeur pour gérer les commentaires d'un blog
commentaryRouter.get('/', authenticateJWT, async (req, res) => {
// Récupération de tous les commentaires dans la base de données
    try {
        const data = await client.query('SELECT * FROM blogbrief');
// Retourne une réponse JSON avec les commentaires
        res.status(200).json(
            {
                status: "success",
                data: data.rows
            }
        )
    }
    catch (err) {
        // Retourne une erreur 500 en cas d'erreur côté serveur
        res.status(500).json(
            {
                status: "fail",
                message: "erreur serveur"
            }
        )
        console.log(err.stack)
    }
})

// Récupération d'un commentaire spécifique en fonction de son ID
commentaryRouter.get('/:id', authenticateJWT, async (req, res) => {
    const blogbriefId = req.params.id

    if (!Number.isNaN(Number(blogbriefId))) {
        try {
            const data = await client.query('SELECT * FROM blogbrief WHERE id=$1', [blogbriefId]);
            if (data.rows.length === 1) {
                // Retourne une réponse JSON avec le commentaire
                res.status(200).json(
                    {
                        status: "success",
                        data: data.rows[0]
                    }
                )
            }
            else {
                // Retourne une erreur 404 si l'ID ne correspond à aucun commentaire
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
        // Retourne une erreur 404 si l'ID n'est pas un nombre
        res.status(404).json(
            {
                status: "fail",
                message: "numéro d'ID nécessaire"
            }
        )
    }
})

// Ajout d'un commentaire avec un message et un ID utilisateurx
commentaryRouter.post('/', authenticateJWT, async (req, res) => {
    console.log(req.body);

    const mess = req.body.message
    const userId = req.userId

    console.log(mess, userId);

    if (mess && userId != null) {
        try {
            const data = await client.query('INSERT INTO blogbrief (message, user_id) VALUES ($1,$2) returning *', [mess, userId]);

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


commentaryRouter.delete('/:id', authenticateJWT, async (req, res) => {
    const deleteId = req.params.id
    const test = req.userId

    if (!Number.isNaN(Number(deleteId))) {
        try {
            const ticketData = await client.query('SELECT id, user_id FROM blogbrief WHERE id=$1', [deleteId]);
            if (test !== ticketData.rows[0]['userId']) {
                res.status(404).json(
                    {
                        status: "FAIL",
                        message: "suppression non autorisée"
                    }
                )

            }
            else {
                const data = await client.query('DELETE from blogbrief WHERE id= $1', [deleteId])

                if (data.rowCount === 1) {
                    res.status(200).json(
                        {
                            status: "success",
                            message: " supprimé"
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


commentaryRouter.put('/:id', authenticateJWT, async (req, res) => {

    const updateId = req.params.id
    const updateMess = req.body.message
    const updateDone = req.body.done
    const test = req.userId

    if (!Number.isNaN(Number(updateId))) {
        if (updateMess && updateDone !== undefined) {
            if (updateDone === true || updateDone === false) {

                try {
                    const ticketData = await client.query('SELECT id,user_id FROM blogbrief WHERE id=$1', [updateId]);
                    if (test !== ticketData.rows[0]['userId']) {
                        res.status(404).json(
                            {
                                status: "FAIL",
                                message: "update non autorisée"
                            }
                        )

                    }
                    else {
                        const data = await client.query('UPDATE blogbrief SET  done = $3, message = $1 WHERE id = $2 RETURNING *', [updateMess, updateId, updateDone])

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




module.exports = commentaryRouter;