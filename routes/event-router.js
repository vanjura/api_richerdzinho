'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/event-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
// router.get('/', _ctrl.get);
router.post('/', _ctrl.post);

// router.get('/search', _ctrl.get);

// //Privado
// router.put('/', auth, _ctrl.put);
// router.get('/:id', auth, _ctrl.getById);
// router.delete('/:id', auth, _ctrl.delete);

module.exports = router;