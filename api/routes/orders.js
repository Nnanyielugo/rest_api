const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const orderController = require('../controllers/orders'); 

router.get('/', checkAuth, orderController.orders_get);

router.post('/', checkAuth, orderController.order_make);

router.get('/:orderId', checkAuth, orderController.order_getOne);

router.delete('/:orderId', checkAuth, orderController.order_delete);

module.exports = router