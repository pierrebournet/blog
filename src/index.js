// imports
const express = require('express');
require('dotenv').config();
const articlesRouter = require('./routes/articlesRouter');
//const commentaryRouter = require('./routes/commentaryRouter');
//const usersRouter = require('./routes/usersRouter');



// declarations
const app = express();
const port = 8000;



app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// routes Ticket

app.use('/api/articles', articlesRouter);
//app.use('/api/commentary', commentaryRouter);
//app.use('/api/users', usersRouter);

app.all('*', async (req, res)=>{
    console.log(req.method,req.originalUrl);
    res.status(404).end("not found");
});


// ecoute le port 8000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})