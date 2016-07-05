var express = require('express');
var router = express.Router();

router.use('/users', require('./user'));
router.use('/listings', require('./listings'))
router.use('/stores', require('./stores'));

module.exports = router;
