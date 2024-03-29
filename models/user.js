'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var JWT_SECRET = process.env.JWT_SECRET || 'assasadsasadfsadf';

var userSchema = new mongoose.Schema({
    name: {type: String},
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: {type: String},
    address: {type: Object},
    joinDate: {type: String},
    pic: {type: String},
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    usertype: {type: String, default: "customer"},
    admin: {type: Boolean, default: false}
});


userSchema.statics.auth = role => {
    return function (req,res,next) {
        var token = req.cookies.accessToken;
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if(err){
                return res.status(401).send({error: 'Authentication required.'});
            }
            User.findById(payload._id)
                .populate('listings')
                .select('-password')
            .exec((err, user) => {
                if(err || !user) return res.status(401).send({error: 'User not found.'});
                req.user = user;
                if(role === 'admin' && !req.user.admin) {
                    return res.status(403).send({error: 'Not authorized.'});
                }
                next();
            });
        });
    };
};


userSchema.statics.register = (userObj, cb) => {
    console.log(userObj.user.address)
    User.findOne({email: userObj.user.email}, (err, dbUser) => {
      //if (err){console.log(err)}
      console.log('Step 1')
        if (err || dbUser) {
          console.log('Step 2')
          console.log(err || dbUser)
          return cb({error: 'Email not available.'});
        }
        User.findOne({username: userObj.user.username}, (err, dbUser) => {
          console.log(err || dbUser)
        console.log('Step 3')
            if (err || dbUser) {
              console.log('errDb: ',err)
              return cb({error: 'Username not available.'});
            }
            var user;
            bcrypt.hash(userObj.user.password, 12, (err, hash) => {
                console.log('err', err);
                if (err) return cb(err);
                if (userObj.user.authType === 'user') {
                    user = new User({
                        name: userObj.user.name,
                        email: userObj.user.email,
                        password: hash,
                        address: userObj.user.address,
                        phone: userObj.user.phone,
                        pic: userObj.user.pic,
                        username: userObj.user.username,
                        usertype: userObj.user.usertype,
                        joinDate: userObj.user.joinDate,
                        transactions: [],
                        messages: []
                    });
                }
                else if (userObj.user.authType === 'admin') {
                    user = new User({
                        name: userObj.user.name,
                        email: userObj.user.email,
                        password: hash,
                        username: userObj.user.username,
                        admin: true
                    });
                }
                user.save((err, savedUser) => {
                    console.log('err:', err)
                    savedUser.password = null;
                    cb(err, savedUser);
                });

                // user.save(err, savedUser) => {
                //     console.log('err:',err);
                //     console.log('user:', savedUser);
                //          savedUser.password = null;
                //          cb(err, savedUser);
                // });
            });
        });
    });
};

userSchema.statics.authenticate = (userObj, cb) => {
    User.findOne({email: userObj.email}, (err, dbUser) => {
        if(err || !dbUser) return cb(err || { error: 'Authentication failed.  Invalid email or password.' });

        bcrypt.compare(userObj.password, dbUser.password, (err, isGood) => {
            if(err || !isGood) return cb(err || { error: 'Authentication failed.  Invalid email or password.' });

            var token = dbUser.generateToken();

            cb(null, token);
        });
    });
};

userSchema.methods.getCurrentUser = function() {
    User.findById(userId, (err, user, cb) => {
        return cb(user);
    });
};
userSchema.methods.generateToken = function() {
    var payload = {
        _id: this._id,
        exp: moment().add(1, 'day').unix()
    };

    return jwt.sign(payload, JWT_SECRET);
};

userSchema.statics.verify = (token, cb) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return cb(err);

        User.findById(payload._id, (err, user) => {
            if (err || !user) return cb(err || 'User not found.');
            user.verified = true;
            user.save(cb);
        });
    });
};
var User = mongoose.model('User', userSchema);

module.exports = User;
