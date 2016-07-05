'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new mongoose.Schema({
    store: {type: Object},
    title: {type: String},
    name: {type: String},
    price: {type: Number},
    pic: {type: String},
    quantity: {type: Number}
});



var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
