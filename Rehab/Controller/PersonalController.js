global.config = require('../config/env');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json())


const GestorPersonal = require("../Infraestructure/GestorPersonal");



router.post('/Personal/get', async (req, res, next) => {
    var personal = await GestorPersonal.getData(req.body);
    res.send(personal);
});

router.get('/Personal/getAll', async (req, res, next) => {
    var personal = await GestorPersonal.getAll();
    res.send(personal);
});


router.post('/Personal/new', async (req, res, next) => {
    try {
        console.log(req.body)
        var response = await GestorPersonal.create(req.body);
        res.send(response);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});





module.exports=router