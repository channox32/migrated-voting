(function(){

angular.module('pnhsApp',['ngRoute'])
.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeStart',function(event,next,current){
        if(next.required && (localStorage.adminID || localStorage.studentID)){
            $location.path(next.originalPath);   
            return;
        }
        if(!next.required && !(localStorage.adminID || localStorage.studentID)){
            $location.path(next.originalPath);
        }
    });
});

}());