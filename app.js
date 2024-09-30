const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware for http requests
const bodyParser = require('body-parser');

//handling CORS errors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); //giving access to any origin you can use it to give access to only your own domain only but it still can be accessed with testing tools like Postman
    res.header('Acess-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
}); //now you can still send requests from tools like postman and send it from single web page too


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