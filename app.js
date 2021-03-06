const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('./api/db');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const app = express();

app.use(logger('dev'));
// make upload path publicly accessible
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH. DELETE, GET');
        return res.status(200).json({});
    }
    next()
});


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


// handle error, pass message, set statusCode, and pass error object to next()
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});

// catch 500 error and handle
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

app.set('port', process.env.PORT || 3500);

const server = app.listen(app.get('port'), function(){
    console.log('Server listening on ' + server.address().port)
})