'use strict'
const { Router } = require('express');
const router = Router()
/*The Router() express method creates a new router object (fucntion). Once created we can add middleware and http method routes to it. Then call it as a call back in a middleware. This way to implement routes help us groupe the routes by entity in the router object which eil contain all the routes/enpoints for a given entity
*/

router.get('/', (req, res, next) => {console.log("hello from get"); next()},  (req, res, next) => { res.status(200).json({message: "Hello from get"})});
router.get('/:id', (req, res, next) => { res.status(200).json({message: "Hello from get by id"})});
router.post('/', (req, res, next) => { res.status(200).json({message: "Hello from post"})});
router.put('/:id', (req, res, next) => { res.status(201).json({message: "Hello from put"})});
router.delete('/:id', (req, res, next) => { res.status(200).json({message: "Hello from delete"})});

module.exports = router;
