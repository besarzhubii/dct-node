
const router = require('express').Router();
const controller = require('../controllers/shopify');
router.get('/',controller.getOne);
router.post('/:storeId',controller.fetchData);
router.post('/wastage/:storeId',controller.fetchDataWastage);

module.exports = router;