'use strict'
const { Router } = require("express");
const router = Router();
const  { userSignInHandler } = require('./local.controller');

router.post('/login', userSignInHandler);

module.exports = router;
