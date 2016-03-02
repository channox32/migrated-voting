(function(){
    var ADMIN_API = 'api/admin/',
        STUDENT_API = 'api/student/',
        CANDIDATE_API = 'api/candidate/',
        VOTE_API = 'api/process/vote/';

angular.module('pnhsApp')
.config(function($routeProvider){
    $routeProvider.when('/admin/dashboard', {
        templateUrl : 'modules/dashboard/index.html',
        controller: 'adminDashboard',
        controllerAs : 'dashboard',
        required : true
    });
})
.controller('adminDashboard',Dashboard);

Dashboard.$inject = ['$scope', '$http', '$location'];

function Dashboard($scope,$http,$location){
    var self = this;
    var titles = ['Student','Candidate & Votes'];
    self.positionIndex = 0;
    self.filteredCandidate = "9";
    self.option = "new";
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
    self.titleIndex = 0;
    
    self.addCandidate = function(){
        if(self.candidate){
            $http.post(CANDIDATE_API + 'addCandidate', self.candidate)
            .then(function(response){
                if(response.data && response.data.status){
                    swal("Candidate Successfully Added!");
                    getCandidateList();
                    

                }
                if(self.option === 'new'){
                    getDistinctPartList();
                }
                self.candidate = null;
            },function(error){
                swal("Error", "Unable to save candidate!","error");
            });
        }
    };

    self.logout = function(){
        localStorage.removeItem('adminID');
        $location.path('/admin');
    }

    self.candidateFilter = function(element){
        if(self.filteredCandidate > 8){
            return element;
        }
        return element.position == self.filteredCandidate ? element : false;
    };


    angular.element(document).ready(function(){
        var adminID = localStorage.getItem('adminID');
        getUserInfo(adminID);
        getUserList();
        getCandidateList();
        getDistinctPartList();
    });

    function getUserInfo(id){
        $http.get(ADMIN_API + 'getUserInfo/' + id)
        .then(function(response){
            self.userInfo = response.data;
        },function(error){
            throw new Error(error);
        });
    }

    function getUserList(){
        $http.get(STUDENT_API)
        .then(function(response){
            if(response.data.status && response.data.users){
                self.studentList = response.data.users;
            }
        },function(error){
            throw new Error(error);
        });
    }


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

    function getDistinctPartList(){
        $http.get(CANDIDATE_API + 'getPartyList')
        .then(function(response){
            if(response.data.status && response.data.party){
                self.partyList = response.data.party;
            }
        },function(err){
           throw new Error(error); 
        });
    }

    $scope.$watch(function(){
        return self.titleIndex;
    },function(newVal, oldVal){
        self.subTitle = titles[self.titleIndex];
    });

}

}());