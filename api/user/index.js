'use strict'
const { Router } = require("express");
const router = Router();
const { userSignInHandler, userSignUpHandler } = require("./user.controller");

router.post('/',userSignUpHandler);

module.exports = router;
