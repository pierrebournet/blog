

const express = require('express');
const client = require('../services/client');
const commentaryRouter = express.Router();
const authenticateJWT = require('../middlewares/auth')
const CommentaryController = require("../controllers/commentaryController")
const commentaryController = new CommentaryController()


// Création d'un routeur pour gérer les articles d'un blog
commentaryRouter.get('/',
    commentaryController.getAllCommentary
)

commentaryRouter.get('/:id',
    authenticateJWT,
    commentaryController.getCommentaryById
)

// Création d'un commentaire
commentaryRouter.post('/',
    authenticateJWT,
    commentaryController.addCommentary
)
//modifier un commentaire

commentaryRouter.put('/:id',
    authenticateJWT,
    commentaryController.editCommentary
)

// Suppression d'un commentaire
commentaryRouter.delete('/:id',
    authenticateJWT,
    commentaryController.deleteCommentary
)




module.exports = commentaryRouter;