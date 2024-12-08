const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller')

//INDEX 

router.get('/', controller.index)

//AGREGAR RESERVA

router.get('/add', controller.addGet)
router.post('/add', controller.addPost)

//ACTUALIZAR RESERVA

router.get('/update', controller.updateGet)
router.put('/update/:id', controller.updatePut)

//CANCELAR RESERVA 

router.delete('/delete/:id', controller.delete)
router.get('/delete', controller.deleteGet)

//MONSTRAR TODAS LAS RESERVAS

router.get('/showAll', controller.showAll)

module.exports = router;