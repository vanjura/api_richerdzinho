'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/event-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
// router.get('/', _ctrl.get);
router.post('/',auth, _ctrl.post);
router.get('/',auth, _ctrl.get);
router.put('/',auth, _ctrl.put);
router.get('/search',auth, _ctrl.search);
router.get('/:id',auth, _ctrl.getById);
router.delete('/:id',auth, _ctrl.delete);

// //Privado
// router.put('/', auth, _ctrl.put);

module.exports = router;