const { faillingId, faillingString } = require("../modules/faillingtest");
const CommentaryServices = require("../services/commentaryServices");
const ArticlesServices = require("../services/articlesServices");

const commentaryServices = new CommentaryServices()
const articlesServices = new ArticlesServices()

class CommentaryController {

    //récupérer tous les commentaires
    async getAllCommentary(req, res) {
        try {
            const data = await commentaryServices.getAllCommentary();
            res.status(200).json(
                {
                    status: "success",
                    data: data
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
            console.log(err.stack);
        }
    }




    //Récupérer un commentaire spécifique en utilisant son ID

    async getCommentaryById(req, res) {

        const commentary_id = req.params.id;
        if (faillingId(commentary_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non trouvé"
                }
            )
            return;
        }
        try {
            const data = await commentaryServices.getCommentaryById(commentary_id);
            console.log(commentary_id);
            if (data) {
                res.status(200).json(
                    {
                        status: "success",
                        data: data
                    }
                )
            }
            else {
                res.status(400).json(
                    {
                        status: "fail",
                        message: "commentaire non trouvé"
                    }
                )
            }
        }
        catch (err) {
            console.log(err.stack)
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
        }
    }

    /* //Récupérer les commentaires d'un utilisateur
    async getCommentaryById(req, res) {
        
        const commentary_id = req.params.id;
        if (faillingId(commentary_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non trouvé"
                }
            )
            return;
        }
    try {
        const data = await CommentaryServices.getCommentaryById(users_id);
        console.log(commentary_id);
        if (data) {
            res.status(200).json(
                {
                    status: "success",
                    data: data
                }
            )
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "commentaire ne correspond pas "
                }
            )
        }
    }
    catch (err) {
        console.log(err.stack)
        res.status(500).json(
            {
                status: "fail",
                message: "erreur serveur"
            }
        )
    }
        } */

    //ajouter un nouveau commentaire
    async addCommentary(req, res) {
        const { title, content, articles_id , users_id} = req.body;
        if (faillingId(articles_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingString(title)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "titre non valide"
                }
            )
            return;
        }

        if (faillingString(content)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "contenu non valide"
                }
            )
            return;
        }

        try {
            const data = await commentaryServices.addCommentary(title, content, articles_id , users_id);
            res.status(201).json(
                {
                    status: "success",
                    message: "commentaire ajouté",
                    data: data
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
    }

    //modifier un commentaire
    async editCommentary(req, res) {
        const { title, content, users_id } = req.body;
        const commentary_id = req.params.id;
        console.log(users_id);
        if (faillingId(users_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingId(commentary_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingString(title)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "titre non valide"
                }
            )
            return;
        }

        if (faillingString(content)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "contenu non valide"
                }
            )
            return;
        }

        try {
            const verify = await commentaryServices.getCommentaryById(commentary_id);
            if (!verify) {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "ce commentaire n'existe pas"
                    }
                )
                return;
            }
            if (verify.users_id !== users_id) {//vérification de l'auteur du commentaire
                res.status(400).json(
                    {
                        status: "fail",
                        message: "ce commentaire ne vous appartient pas"
                    }
                )
                return;
            }
            const data = await commentaryServices.editCommentary(commentary_id, title, content);
            if (data) {
                res.status(200).json(
                    {
                        status: "success",
                        message: "commentaire modifié",
                        data: data
                    }
                )
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "commentaire non trouvé"
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


    //supprimer un commentaire

    async deleteCommentary(req, res) {
        const deleteId = req.params.id
        const user_id = req.body.users_id
        if (faillingId(deleteId)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }
        if (faillingId(user_id)) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }
        try {
            const data = await
            commentaryServices.deleteCommentary(deleteId, user_id)
            if (data) {
                res.status(200).json(
                    {
                        status: "success",
                        message: " commentaire supprimé"
                    }
                )
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "commentaire non trouvé"
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
}

module.exports = CommentaryController


