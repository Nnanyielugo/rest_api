const router = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/products')

router.get('/', (req, res, next)=>{
    Order
        .find()
        // add product information to each order
        // pass an optional second property to specify the properties you want to populate
        .populate('product', 'name')
        .exec()
        .then(doc =>{
            res.status(200).json(doc)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
})

router.post('/', (req, res, next)=>{

    Product.findById(req.body.productId)
        .then(product =>{
            if(!product){
                return res.status(404).json({
                    message: "product not found"
                })
            }
            const order =  new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order
                .save();
            }).then(result =>{
                console.log(result);
                res.status(201).json({
                    message: 'Order stored',
                    createdOrder: {
                        _id: result.id,
                        product : result.product,
                        quantity: result.quantity
                    }
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });        
})


router.get('/:orderId', (req, res, next)=>{
    Order
        .findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order =>{
            if(!order){
                return res.status(404).json({
                    message: "Order not found"
                })
            }else {
                res.status(200).json({
                    order: order 
                });
            };
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message: err
            })
        })
})


router.delete('/:orderId', (req, res, next)=>{
    const id = req.params.orderId;
    Order
        .remove({_id: id})
        .exec()
        .then(result =>{
            res.status(204).json(order)
        })
        .catch(err =>{
            console.log(err)
            res.send(500).json({
                error: err
            })
        });
})

module.exports = router