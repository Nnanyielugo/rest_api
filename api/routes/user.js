const router = require('express').Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth')


router.post('/signup', userController.user_signup);

router.post('/login', userController.user_login);

router.delete('/:userId', checkAuth, userController.user_delete)

module.exports = router;