const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware for http requests
const bodyParser = require('body-parser');

//Routes for product, order
const ProductRoutes = require('./api/routes/products');
const OrderRoutes = require('./api/routes/orders');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})) //extended can be true or false. true: extends body with rich data in it false: extends simple bodies for URL encoded data
app.use(bodyParser.json());




//Routes to handle requests
app.use('/products',ProductRoutes);
app.use('/orders',OrderRoutes);

//error handling
app.use((req,res,next)=>{
    const error = new Error('cannot find this url');
    error.status = 404;
    next(error);
});
//this method can handdle any error 
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})


module.exports = app;