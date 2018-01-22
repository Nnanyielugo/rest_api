const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');

// multer config
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        // select name you want to store image with
        cb(null, new Date().toISOString() + file.originalname);
    }
})

// multer filter configuration
const fileFilter = (req, file, cb) => {
    
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // accept file
    cb(null, true);
    } else{
        // reject file
        // pass custom error message to 'null' parameter
        cb(new Error('Invalid file type'), false);
    }    
}

// initialize multer
// upload size limit: 5mb
const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter 
});

const Product = require('../models/products');

router.get('/', (req, res, next)=>{
    Product
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            if(docs.length > 0){
                res.status(200).json(docs);
            }else{
                res.status(200).json({
                    message: "No products in database. Add product?"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// add product image to product using multer
// multer also parses body
// make productImage hold the url of the image
router.post('/', upload.single('productImage'), (req, res, next)=>{
    console.log(req.file)
   
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                createdProduct: product
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    
})

// get route for fetching a single product.
// since .then is a promise and promises run asynchronously, sending the json success response after the catch block
// will cause the response to be sent before the get code runs.
// The response is instead sent inside the .then block
router.get('/:productId', (req, res, next)=>{

    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(201).json({
                    createdProduct: doc
                });
            } else{
                res.status(404).json({ message: 'No valid entry found for provided id'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

router.patch('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    // pass the entire request body to the update function so that only values passed in are updated
    Product
        .findByIdAndUpdate(id, req.body, {new: true})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product
        .remove({_id: id})
        .exec()
        .then(result =>{
            res.status(204).json(result)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router