'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/event-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
// router.get('/', _ctrl.get);
router.post('/', _ctrl.post);
router.get('/', _ctrl.get);
router.put('/', _ctrl.put);
router.get('/search', _ctrl.search);
router.get('/:id', _ctrl.getById);
router.delete('/:id', _ctrl.delete);

// //Privado
// router.put('/', auth, _ctrl.put);

module.exports = router;