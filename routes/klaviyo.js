
const router = require('express').Router();
const controller = require('../controllers/klaviyo');

router.get('/',controller.getOne);

module.exports = router;