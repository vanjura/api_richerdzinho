'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/message-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

//Publico
// router.get('/', _ctrl.get);
router.post('/',auth, _ctrl.post);
router.put('/',auth, _ctrl.put);
router.get('/evento/:id',auth, _ctrl.getById);
router.delete('/:id',auth, _ctrl.delete);

// //Privado
// router.put('/', auth, _ctrl.put);

module.exports = router;