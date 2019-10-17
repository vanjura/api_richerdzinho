'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/doador-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
router.post('/login', _ctrl.autenticar);
router.post('/', _ctrl.post);

//Privado
router.put('/', auth, _ctrl.put);
router.get('/:id', auth, _ctrl.getById);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;