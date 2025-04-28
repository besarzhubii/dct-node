
const router = require('express').Router();
const controller = require('../controllers/google');
router.get('/',controller.getOne);

module.exports = router;