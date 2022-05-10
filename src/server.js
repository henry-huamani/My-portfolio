var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config.js');
var bodyParse = require("body-parser");
const contacto = require("./servidor/contacto");
require('dotenv').config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

var app = express();
app.set('port',(process.env.PORT));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use('/static', express.static('dist'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const nuevoContacto = new contacto({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database:  DB_NAME
})

app.get('/', function(req, res, next){
    res.send('ok');
});

app.post('/api/contacto', function(req, res, next){
    nuevoContacto.agregarContacto(req.body.n, req.body.c, req.body.a, req.body.m);
    res.send("ok");
});

app.listen(app.get('port'), () => {
    console.log(`Active server on port ${process.env.PORT}`);
});