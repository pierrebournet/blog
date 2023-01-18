const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersServices = require('../services/usersServices')

const UsersServices = require('../services/usersServices');
require('dotenv').config()

const accessTokenSecret= process.env.accessTokenSecret;

const usersService = new UsersServices();


class UsersController{
    async login(req, res)
    {
        const name = req.body.name;
        const password = req.body.password
        try {
            const user = await usersService.getUserByName(name); 
            console.log(user);
    
            if (user) {
                bcrypt.compare(password, user.password, async function (err, result) {
    
                    if (result == true) {
                        const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret);
    
                        res.status(200).json({
                            status: 'OK',
                            data : accessToken,
                            message: 'logged in'
                        });
                    }
                    else {
                        res.status(403).json(
                            {
                                status: "fail",
                                message: "mot de passe incorrect",
                                data: null
                            }
                        )
                    }
                }
                )
            }
            else {
                res.status(404).json(
                    {
                        status: "fail",
                        message: "identifiant incorrect",
                        data: null
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
            console.log(err.stack);
        }
    }



    register(req, res)
    {
        const name = req.body.name;
        const password = req.body.password
        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                console.log("test", req.body);
                const data = await usersService.addUser(name, hash);
    
                res.status(201).json(
                    {
                        status: "success",
                        message: "register success",
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
        });
    }
}

module.exports = UsersController