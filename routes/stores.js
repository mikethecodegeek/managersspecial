var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req,res)=> {
     User.find({})
        .exec((err, data) => err ? res.send(err) : res.send(data));
});
router.get('/all', (req,res)=> {
     User.find({usertype:"store"})
        .exec((err, data) => err ? res.send(err) : res.send(data));
});

router.get('/id/:id', (req,res)=> {
    console.log('params:',req.params)
    User.findById(req.params.id)
        .populate('transactions')
    .exec((err,data) => err ? res.send(err) : res.send(data));
});


router.delete('/:id', (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            User.find({})
                .exec((err, data) => err ? res.send(err) : res.send(data));
        }
    });
});

router.put('/:id', (req,res)=> {
    User.findByIdAndUpdate(req.params.id,{$set: req.body.user}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
