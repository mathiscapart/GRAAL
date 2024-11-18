const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const myToken = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send('Token non fourni');

    const parts = authHeader.split(' ');
    const [ , token] = parts;

    if (token !== process.env.TOKEN) return res.status(401).send('Token non valide');
    next()
}

const carRouter = require('./carRoute');
const clientRouter = require('./clientRoute');
const marqueRouter = require('./marqueRoute');
const modelRouter = require('./modelRoute');
const reservationRouter = require('./reservationRoute');

app.use(myToken)
app.use(bodyParser.json());
app.use('/car', carRouter);
app.use('/client', clientRouter);
app.use('/marque', marqueRouter);
app.use('/model', modelRouter);
app.use('/reservation', reservationRouter);

module.exports = app;