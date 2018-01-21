const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Handling get requests for /orders"
    })
})

router.post('/', (req, res, next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Handling post requests to /orders",
        order: order
    })
})


router.get('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: "Handling get requests for /order/orderId"
    })
})


router.delete('/:orderId', (req, res, next)=>{
    res.status(204).json({
        message: "deleted order"
    })
})

module.exports = router