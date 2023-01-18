const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commentaryController = require('../controllers/commentaryController');

const accessTokenSecret= process.env.ACCESTOKENSECRET;

const commentaryController = new CommentaryController();


//Récupérer les commentaires d'un article
const getCommentaryByArticleId = async (articleId) => {
    try {
        const data = await CommentaryServices.getCommentaryByArticleId(articleId);
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

//Récupérer un commentaire spécifique en utilisant son ID

const getCommentaryById = async (commentaryId) => {
    try {
        const data = await CommentaryServices.getCommentaryById(commentaryId);
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

//Récupérer les commentaires d'un utilisateur

const getCommentaryByUserId = async (userId) => {
    try{
        const data = await CommentaryServices.getCommentaryByUserId(user_id)
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
//modifier un commentaire

const updateCommentary = async (req, res) => {

    const commentaryId = req.params.id;
    const commentary = req.body;
    try {
        const data = await CommentaryServices.updateCommentary(commentaryId, commentary
        );
        res.status(201).json(
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

//supprimer un commentaire

const deleteCommentary = async (req, res) => {
    const commentaryId = req.params.id;
    try {
        const data = await CommentaryServices.deleteCommentary(commentaryId);
        res.status(201).json(
            {
                status: "success",
                message: "commentaire supprimé"
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

module.exports = {
    getAllCommentary,
    getCommentaryByArticleId,
    getCommentaryById,
    getCommentaryByUserId,
    addCommentary,
    updateCommentary,
    deleteCommentary,
}
