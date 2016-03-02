(function(){
var studentAPI = '/api/student/';


angular.module("pnhsApp")
.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl : 'modules/registration/index.html',
        controller : 'registrationController',
        controllerAs : 'registration',
        required:false
    });
})
.controller('registrationController',Registration);

Registration.$inject = ['$scope','$http','$location'];


function Registration($scope,$http,$location){
    var self = this;
    /* CONSTANTS */ 
    self.sectionList = [];
    self.credential = {
        lrn : '',
        firstname: '',
        lastname : '',
        middlename : '',
        gender : '',
        yearlevel : 7
    };

    self.getAge = function(birthdateStr){
        var today = new Date();
        var birthDate = new Date(birthdateStr);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    self.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
    };

    self.register = function(){
        $http.post(studentAPI + 'addStudent', self.credential)
        .then(function(response){
            var studentData = response.data;
            localStorage.setItem('studentID',studentData.lrn);
            $location.path('/process/vote/1');
        },function(error){
            swal("Error","Student already registered!","error");
            self.credential.lrn = null;
        });
    };


    $scope.$watch(function(){
        return self.credential.birthdate;
    }, function(newVal,oldVal){
        if(newVal instanceof Date){
            self.credential.age = self.getAge(newVal);
        }
    });

            $scope.$watch(function(){
            return self.credential.yearlevel;
        },function(newValue,oldValue){
            if(newValue){
                switch(newValue.toString()){
                    case '7':
                        self.sectionList = [
                               'Ampere',
                               'Archimedes ',
                               'Aristotle ',
                               'Diophantus ',
                               'Napier ',
                               'Newton ',
                               'Pythagoras ',
                               'Socrates ',
                               'Tesla ',
                               'Thales '
                        ]; 
                        break;
                    case '8':
                        self.sectionList = [
                                'Bernoulli',
                                'Darwin',
                                'Fleming',
                                'Keppler',
                                'Galilei',
                                'Hawking',
                                'Jenner',
                                'Mendel',
                                'Nobel',
                                'Pasteur'
                        ];
                        break;
                    case '9':
                        self.sectionList = [
                            'Copernicus',
                            'Curie',
                            'Dalton',
                            'Da Vinci',
                            'Democritus',
                            'Edison',
                            'Faraday',
                            'Pascal',
                            'Torricelli'
                        ];
                        break;
                    default : 
                        return;
                }
            }
        });

}


}());