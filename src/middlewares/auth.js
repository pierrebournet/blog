const jwt = require('jsonwebtoken'); // importe la bibliothèque jsonwebtoken
require('dotenv').config() // importe la bibliothèque dotenv pour accéder aux variables d'environnement

const accessTokenSecret = process.env.accessTokenSecret // récupère la clé secrète d'accès à partir des variables d'environnement

const authenticateJWT = async(req, res, next) => { // déclare la fonction middleware authenticateJWT
    const authHeader = req.headers.authorization; // récupère l'en-tête d'autorisation à partir de la demande
//console.log(authHeader);
    if (authHeader) { // si l'en-tête d'autorisation est présent
        const token = authHeader.split(' ')[1]; // extrait le jeton de l'en-tête d'autorisation

        jwt.verify(token, accessTokenSecret, (err, token) => { // vérifie le jeton
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ // si le jeton est expiré, renvoie un statut 401 et un objet json avec un statut 'échoué' et un message 'Jeton expiré'
                        status: 'fail',
                        message: 'Jeton expiré'
                    });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(401).json({ // si le jeton est invalide, renvoie un statut 401 et un objet json avec un statut 'échoué' et un message 'Jeton non valide'
                        status: 'fail',
                        message: 'Jeton non valide'
                    });
                }
            }
            req.body.users_id = token.userId; // ajoute l'ID de l'utilisateur à l'objet demande
            next(); // appelle la fonction suivante du middleware
        });
    } else {
        res.status(401).json(
            {  
                status: 'fail',
                message: 'Jeton non fourni'
            }
        ); // si l'en-tête d'autorisation n'est pas présent, renvoie un statut 401
    }
};
module.exports = authenticateJWT; // exporte la fonction middleware authenticateJWT
