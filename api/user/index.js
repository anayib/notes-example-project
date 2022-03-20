'use strict'
const { Router } = require("express");
const router = Router();
const { signUpUserHandler, getUserByIdHandler } = require("./user.controller");

router.post('/', signUpUserHandler);
router.get('/:id', getUserByIdHandler);

module.exports = router;
