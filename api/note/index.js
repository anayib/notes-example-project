'use strict'
const { Router } = require('express');
const router = Router()
/*The Router() express method creates a new router object (fucntion). Once created we can add middleware and http method routes to it. Then call it as a call back in a middleware. This way to implement routes help us groupe the routes by entity in the router object which eil contain all the routes/enpoints for a given entity
*/
const {
  getAllNotesHandler,
  getNoteHandler,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
} = require('./note.controller');

router.get('/', getAllNotesHandler );
router.get('/:id', getNoteHandler);
router.post('/', createNoteHandler);
router.put('/:id', updateNoteHandler);
router.delete('/:id', deleteNoteHandler);

module.exports = router;
