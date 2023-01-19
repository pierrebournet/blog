const { faillingId, faillingString } = require("../modules/faillingtest");
const ArticlesServices = require("../services/articlesServices");
const CommentaryServices = require("../services/commentaryServices");

const articlesServices = new ArticlesServices()
const commentaryServices = new CommentaryServices()

class ArticlesControllers {



    //Récupérer tous les articles
    async getAllArticles(req, res) {
        try {
            const data = await articlesServices.getAllArticles();
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
            console.log(err.stack)
        }
    }

    //Récupérer un article par son id
    async getArticleById(req, res) {

        const article_id = req.params.id;
        if (faillingId(article_id)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
                )
                return;
            }
            try {
                const data = await articlesServices.getArticlesById(article_id);
                console.log(article_id);
            if (data) {
                res.status(200).json(
                    {
                        status: "success",
                        data: data
                    }
                )
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "article non trouvé"
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





    //ajouter un nouvel article
    async addArticle(req, res) {
        const { title, content, users_id } = req.body;
        if (faillingId(users_id)){ 
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingString(title)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "titre non valide"
                }
            )
            return;
        }

        if (faillingString(content)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "contenu non valide"
                }
            )
            return;
        }

        try {
            const data = await articlesServices.addArticles(title, content, users_id);
            res.status(201).json(
                {
                    status: "success",
                    message: "article ajouté",
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

    //modifier un article
    async editArticle(req, res) {
        const { title, content, users_id } = req.body;
        const article_id = req.params.id;
        if (faillingId(users_id)){ 
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingId(article_id)){ 
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }

        if (faillingString(title)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "titre non valide"
                }
            )
            return;
        }

        if (faillingString(content)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "contenu non valide"
                }
            )
            return;
        }

        try {
            const data = await articlesServices.editArticles(article_id, users_id, title, content );
            if (data){
            res.status(200).json(
                {
                    status: "success",
                    message: "article modifié",
                    data: data
                }
            )}
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "article non trouvé"
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

    //effacer 
    async deleteArticle(req, res) {
        const deleteId = req.params.id
        const user_id = req.body.users_id
        if (faillingId(deleteId)){
            res.status(400).json(
                {
                    status: "fail",
                    message: "id non valide"
                }
            )
            return;
        }
        if (faillingId(user_id)){
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
            articlesServices.deleteArticles(deleteId, user_id)
            if (data){
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
                        message: "article non trouvé"
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
module.exports = ArticlesControllers;













