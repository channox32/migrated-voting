var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var crypto = require('crypto');
var User = mongoose.model('User');


router.post('/adminLogin',function(req,res,next){
    var user = req.body;
    user.password = crypto.createHash("md5").update(req.body.password).digest("hex");
    console.log(user.adminID + '\n');
    console.log(user.password);
    User.findOne({ adminID : user.adminID, password : user.password}, function(err,doc){
        if(err){return next(err)};
        if(doc) {
            res.json({status : 'success', user: doc});
        }else{
            res.json({status : 'error', message : "User not found"});
        }
    });
});

router.get('/getUserInfo/:userID',function(req,res,next){
    var userID = req.params.userID;
    User.findOne({_id : userID},function(err, user){
        if(err) {return next();};
        if(user){
            res.json(user);
        }
    });
});

router.post('/newUser',function(req,res,next){
    var user = req.body;
    user.password = crypto.createHash("md5").update(req.body.password).digest("hex");
    var newUser = new User(user);
    newUser.save(function(err,doc){
        if(err){return next(err);};
        res.json({status : 'success', user : doc});
    });
});


module.exports = router;