const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct : product
    });
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    try {
        if(id == 'specialId'){
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

router.put('/:productId',(req,res,next)=>{
    res.status(400).json({
        message: 'product has been updated'
    });
});

router.delete('/:productId',(req,res,next)=>{
    res.status(400).json({
        message: 'product has been deleted'
    });
})

module.exports = router;