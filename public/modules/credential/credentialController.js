(function(){
    var adminAPI = '/api/admin/'

angular.module('pnhsApp')
.config(function($routeProvider){
    $routeProvider.when('/admin',{
        templateUrl : 'modules/credential/index.html',
        controller : 'credentialController',
        controllerAs : 'login',
        required : false
    }).when('/admin/register',{
        templateUrl : 'modules/credential/newAccount.html',
        controller: 'credentialController',
        controllerAs : 'newAccount',
        required : false
    });
}).controller('credentialController', Credential);

Credential.$inject = ['$scope','$http','$location'];


function Credential($scope,$http,$location){
    var self = this;

    self.credential = {
        adminID : '',
        password : ''
    };

    self.account = {
        firstname : '',
        lastname : '',
        role : '',
        password : '',
        confirm : ''
    };


    self.createAccount = function(){
        var account = self.account;
        account.adminID = account.firstname.substr(0,1) + account.lastname;
        account.adminID.toLowerCase();
        if(account.password === account.confirm){
            delete account.confirm;
            $http.post(adminAPI + 'newUser',account)
            .then(function(response){
                if(response.data.user && response.data.status){
                    swal({
                        title: "Registering User",
                        text: "Please do not reload your browser.",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    $location.path('/admin');
                }
            },function(error){
                swal("Error","Unable to Register!","error");
                account.password = '';
                account.confirm = '';
            });
        }else{
            swal("Error","Password does not match! Please try again","error");
            account.password = '';
            account.confirm = '';
        }
    };

    self.proceed = function(){
        $http.post(adminAPI + 'adminLogin', self.credential)
        .then(function(response){
            if(response.data.user && response.data.status === 'success'){
                localStorage.setItem('adminID',response.data.user._id);
                swal({
                        title: "Contacting Server ...",
                        timer: 1000,
                        showConfirmButton: false
                    });
                $location.path('/admin/dashboard');
            }else{
                self.credential.password = null;
                swal("Error", response.data.message, "error");
            }
        },function(error){
            swal("Error Occured!","Unable to Login!","error");
        });
    };


}

}());