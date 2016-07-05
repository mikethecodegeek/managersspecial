var express = require('express');
var router = express.Router();
var Listing = require('../models/listing');
var Store = require('../models/user');
var request = require('request');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/', (req,res)=> {
     Listing.find({})
        .exec((err, data) => err ? res.send(err) : res.send(data));
});

router.post('/newlisting', (req,res)=> {
  console.log(req.body)
     Listing.create(req.body.item, (err,data) => {
       console.log(err || data)
       if (err){res.status(400).send(err)}
       else {
         Store.findOne({_id:req.body.store.data._id}, (err,store) => {
           console.log(store)
           store.listings.push(data._id);
           store.save((err, savedStore) => {
             res.status(200).send(savedStore);

           }  )

         })
       }
     })
});

router.delete('/:id', (req,res)=> {
    Listing.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){res.status(400).send(err)}
        else {
            User.find({})
                .exec((err, data) => err ? res.send(err) : res.send(data));
        }
    });
});

router.put('/:id', (req,res)=> {
    Listing.findByIdAndUpdate(req.params.id,{$set: req.body.user}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;
