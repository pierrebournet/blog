const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commentaryController = require('../controllers/commentaryController');

const accessTokenSecret= process.env.ACCESTOKENSECRET;

const commentaryController = new CommentaryController();
