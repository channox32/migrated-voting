(function(){

var CANDIDATE_API = 'api/candidate/';
var STUDENT_API = 'api/student/';
angular.module('pnhsApp')
.config(function($routeProvider){
    $routeProvider.when('/process/vote/:processParams', {
        templateUrl : function(params){
            var extension = '';
            if(params.processParams != 1){
                extension = params.processParams;
            }
         return 'modules/process/index' + extension + '.html'   
        },
        controller : 'processController',
        controllerAs : 'process'
    });
})
.controller('processController',ProcessVote);

ProcessVote.$inject = ['$scope','$http','$location'];


function ProcessVote($scope,$http,$location){
    var self = this;
    self.processIndex = 1;
    self.positionIndex = 0;
    self.votedCandidates = {};
    self.positions = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Auditor',
    'PIO',
    '4th year Representative',
    '3rd year Representative',
    '2nd year Representative'];
    self.next = function(posIndex){
        self.processIndex++;
        $location.path('process/vote/' + self.processIndex);
    };

    self.select = function($index){
        swal({
            title: "Are you sure?",
            text: "You will not be able to vote again!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No, I'll pick another",
            closeOnConfirm: true,
            closeOnCancel: true 
           },function(isConfirm){
               if (isConfirm) { 
                   self.vote(self.candidateList[$index]._id);
                   $scope.$apply();
                }
            });
    };

    self.vote = function(candidateID){
        $http.get(CANDIDATE_API + 'voteCandidate/' + candidateID)
        .then(function(response){
            if(response.data.status){
                self.positionIndex++;
            }
        },function(error){
            swal("Error","Failed to consolidate vote!","error");
        });
    };

    self.finish = function(){
        var studentID = localStorage.getItem('studentID');
        $http.get(STUDENT_API + 'getStudent/' + studentID)
        .then(function(response){
            swal("Thank you for your participation " + response.data.firstname + ' ' + response.data.lastname );
            localStorage.clear();
            setTimeout(function(){
                $location.path('/');
                $scope.$apply();
            },5000);
        },function(error){
            throw new Error(error);
        });
    }

    angular.element(document).ready(function(){
        getCandidateList();
    });

    function getCandidateList(){
        $http.get(CANDIDATE_API)
        .then(function(response){
            if(response.data.status && response.data.candidates){
                self.candidateList = response.data.candidates
            }
        }, function(error){ 
            throw new Error(error);
        });
    }
}

}());