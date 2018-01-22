const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const productController = require('../controllers/product');
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



router.get('/', productController.getALlProducts);

// add product image to product using multer
// multer also parses body
// make productImage hold the url of the image
// add auth middleware to post route
router.post('/', checkAuth, upload.single('productImage'), productController.createProduct)

// get route for fetching a single product.
router.get('/:productId', productController.getOneProduct);

router.patch('/:productId', checkAuth, productController.updateProduct);

router.delete('/:productId', checkAuth, productController.deleteProduct);

module.exports = router