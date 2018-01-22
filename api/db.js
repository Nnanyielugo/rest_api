const mongoose = require('mongoose');

const URI = require('../config/config').DB_URI;

mongoose.connect(URI);

mongoose.connection.on('connected', function(){
    console.log('mongoose connected to ' + URI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err)
});

mongoose.connection.on('disconnect', function(){
    console.log("mongoose disconnected");
});

require('./models/products');
require('./models/order');
require('./models/user');