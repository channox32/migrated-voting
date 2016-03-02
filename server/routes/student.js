var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Student = mongoose.model('Student');

router.post('/addStudent', function(req,res, next){
  var studentData = req.body;
  Student.findOne({lrn : studentData.lrn}, function(err, student){
    if(err){return next(err);};
    if(student && student.length > 0){
      res.json({ message : "Student already exists!", status : "error"});
    }else{
      var newStudent = new Student(studentData);
        newStudent.save(function(err,newStudent){
              if(err) {return next(err);}
              if(newStudent){
                newStudent.message = "success";
                res.json(newStudent);
              }
        });
    }
  });
});

router.get('/',function(req,res,next){
  Student.find({},function(err,users){
    if(err){return next(err);};
    res.json({status : 'success', users : users});
  });
});

router.get('/getStudent/:id',function(req,res,next){
  var studentID = req.params.id;
  Student.findOne({lrn : studentID},function(err,users){
    if(err){return next(err);};
    res.json(users);
  });
});


module.exports = router;