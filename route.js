const express = require('express');
const userroute = require('./userroute');

const router = express.Router();

router.post('/', userroute.identify);

module.exports = router;