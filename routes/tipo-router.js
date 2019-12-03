'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipo-controller')
const auth = require('../middlewares/authentication')

let _ctrl = new controller();

router.get('/', _ctrl.get);

module.exports = router;