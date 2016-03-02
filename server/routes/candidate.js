var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Candidate = mongoose.model('Candidate');
var SUCCESS = 'success';


router.get('/',function(req,res,next){
  Candidate.find({},function(err,candidates){
    if(err){return next(err);};
    res.json({status : SUCCESS, candidates : candidates});
  });
});

router.post('/addCandidate', function(req,res, next){
  var candidateData = req.body;
    var newCandidate = new Candidate(candidateData);
      newCandidate.save(function(err,newCandidate){
            if(err) {return next(err);}
            if(newCandidate){
              res.json({status : SUCCESS});
            }
      });
});

router.get('/voteCandidate/:candidateID',function(req, res, next){
  var candidateID = req.params.candidateID;

  Candidate.update({_id : candidateID},{$inc : {votes : 1}},function(err, candidate){
      if(err){return next(err);};
      if(candidate){
        res.json({status : SUCCESS});
      }
  });

});


router.get('/getPartyList',function(req,res,next){
  Candidate.distinct('partyList',function(err,docs){
    if(err){return next(err);};
    if(docs.length >= 0) {
      res.json({status : SUCCESS, party : docs});
    }
  });
});

module.exports = router;