
var express = require('express');
var router = express.Router();


const GestorTratamiento = require("../Infraestructure/GestorTratamiento");

var bodyParser = require('body-parser');
router.use(bodyParser.json())


router.get('/Tratamiento/getAll', async (req, res, next) => {
    var response = await GestorTratamiento.getAll();
    res.send(response);
});



router.post('/Tratamiento/new', async (req, res, next) => {
    try {
        var response = await GestorTratamiento.create(req.body);
        res.send(response);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});


module.exports = router;