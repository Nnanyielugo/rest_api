var express = require('express');
var app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req, res, next) =>{
    res.status(200).json({
        message: "it works"
    })
})

app.set('port', process.env.PORt || 3500);

var server = app.listen(app.get('port'), function(){
    console.log('Server listening on ' + server.address().port)
})