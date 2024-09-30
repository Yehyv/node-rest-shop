const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});

router.post('/',(req,res,next)=>{
    const order = {
        productId : req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'Handling POST requests to /orders',
        createdOrder : order
    });
});

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    try {
        if(id == 'specialId2'){
            res.status(200).json({
                message: 'You discovered the special ID',
                id: id
            });
        }
        else{
            res.status(400).json({
                message: 'You passed an ID'
            })
        }
    } catch (error) {
        res.status(404).json({
            message: 'no id entered'
        });
    }
});

router.put('/:orderId',(req,res,next)=>{
    res.status(400).json({
        message: 'order has been updated'
    });
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(400).json({
        message: 'order has been deleted'
    });
})

module.exports = router;