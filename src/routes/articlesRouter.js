
const express = require('express');
const client = require('../services/client');
const articlesRouter = express.Router();
const authenticateJWT = require('../middlewares/auth')
const ArticlesControllers = require('../controllers/articlesController')
const articlesControllers = new ArticlesControllers()
// Création d'un routeur pour gérer les articles d'un blog
articlesRouter.get('/',
    articlesControllers.getAllArticles
)

articlesRouter.get('/:id',
    articlesControllers.getArticleById
)

// Création d'un article
articlesRouter.post('/',
    authenticateJWT,
    articlesControllers.addArticle
)


articlesRouter.put('/:id', 
    authenticateJWT,
    articlesControllers.editArticle
)

// Suppression d'un article
articlesRouter.delete('/:id', 
    authenticateJWT,
    articlesControllers.deleteArticle
)




module.exports = articlesRouter;