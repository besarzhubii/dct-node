
const router = require('express').Router();
const controller = require('../controllers/user')
router.post('/login',controller.login);
router.post('/add',controller.addUser)
    .get('/all-users', controller.getAllUsers)
    .get('/:userId', controller.getUser)
    .put('/:userId', controller.updateUser)

module.exports = router;