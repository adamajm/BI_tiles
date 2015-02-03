//Services
    // step 1 create an app                             
    var myApp = angular.module('Data', []).
    // tep 2 create factory
                // Service name, function
    myApp.factory('Data', function(){
        return { message: "I'm Data from a Service" }
    });



//Controllers
    function FirstController($scope, Data){
        $scope.data = Data;
    }

    function SecondController($scope){

    }