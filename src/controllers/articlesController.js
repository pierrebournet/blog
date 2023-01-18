const ArticlessServices = require("../services/articlesServices");
const CommentaryServices = require("../services/commentaryServices");

const CommentaryServices = new CommentaryServices

//Récupérer tous les articles
const getAllArticles = async (req, res) => {
    try {
        const data = await ArticlessServices.getAllArticles();
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
const getArticleById = async (article_id) => {
    try {
        const data = await ArticlessServices.getArticleById(article_id);
        if (data) {
            return data
        }
        else {
            return undefined
        }
    }
    catch (err) {
        console.log(err.stack)
    }
}




//ajouter un nouvel article
const addArticle = async (req, res) => {
    const { title, content, users_id } = req.body;
    try {
        const data = await ArticlessServices.addArticle(title, content, users_id);
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
const updateArticle = async (req, res) => {
    const { title, content, users_id } = req.body;
    const article_id = req.params.id;
    try {
        const data = await ArticlessServices.updateArticle(title, content, users_id, article_id);
        res.status(200).json(
            {
                status: "success",
                message: "article modifié",
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

// supprimer un article
const deleteArticle = async (req, res) => {
    const article_id = req.params.id;
    try{
        const data = await ArticlessServices.deleteArticle(article_id);
        res.status(200).json(
            {
                status: "success",
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







                





