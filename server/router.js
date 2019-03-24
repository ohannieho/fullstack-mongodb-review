const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.get)
  .post(controller.post);
router
  .route('/:_id')
  .delete(controller.delete)
  .put(controller.put);

module.exports = router;
