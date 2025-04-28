
const router = require('express').Router();
const controller = require('../controllers/meta')
router.get('/',controller.getOne);

module.exports = router;