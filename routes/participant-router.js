'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/participant-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
router.post('/', _ctrl.post);
router.get('/:id', _ctrl.get);
router.delete('/:id', _ctrl.delete);
// router.get('/', _ctrl.get);

// router.get('/search', _ctrl.get);

// //Privado
// router.put('/', auth, _ctrl.put);
// router.get('/:id', auth, _ctrl.getById);

module.exports = router;