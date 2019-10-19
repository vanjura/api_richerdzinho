'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
router.post('/login', _ctrl.autenticar);
router.post('/', _ctrl.post);

//Privado
router.put('/', _ctrl.put); // Sem Autenticação
router.get('/:id', _ctrl.getById); // Sem Autenticação
router.delete('/:id', _ctrl.delete); // Sem Autenticação
// router.put('/', auth, _ctrl.put); // Com autenticação
// router.get('/:id', auth, _ctrl.getById); // Com autenticação
// router.delete('/:id', auth, _ctrl.delete); // Com autenticação

module.exports = router;