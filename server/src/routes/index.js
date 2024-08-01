//This is the routes component
const express = require('express');

const postDogs = require('../controllers/postDogs');

const myRouter = express.Router();

myRouter.post('/dogs', postDogs);

module.exports = myRouter;

//hola