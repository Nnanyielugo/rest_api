const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Handling get requests for /products"
    })
})

router.post('/', (req, res, next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: "Handling post requests to /products",
        createdProduct: product
    })
})


router.get('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: "Handling get requests for /products/productId"
    })
})

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: "updated product"
    })
})

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: "deleted product"
    })
})

module.exports = router