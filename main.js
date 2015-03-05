angular.module('businessTiles', [])
.directive('flipTile', function () {
    return {
        restrict: 'E',
        templateUrl: 'flipTile.html',
        scope: {
            factory: '@',
            title: '@',
            subtitle: '@',
            valueField: '@',
            method: '@',
            table: '@',
            fields: '@',
            parameters: '@',
            frequency: '@'
        },
        controller: function ($scope, $injector, $interval) {
            getCounts();
            $interval(getCounts, $scope.frequency);
           function getCounts () {
                $injector.get($scope.factory)[$scope.method]($scope.table, $scope.fields, $scope.parameters).then(function (count) {
                    $scope.value = count[$scope.valueField];
                    $scope.updated = moment().format('MMMM Do YYYY, h:mm:ss a');
                });      
           }
        }
    }
})
.factory('iris', ['$http', '$q', function($http, $q){
    var irisUrl = 'http://gisdevarc1/dirt-simple-iris/v1/ws_geo_attributequery.php';
    var service = {};
    service.getIrisCount = function (table, fields, params) {
        var d = $q.defer();
        $http.jsonp(irisUrl, {
            params: {
                table: table,
                fields: fields,
                parameters: params,
                callback: 'JSON_CALLBACK'
            }
        }).success(function (data) {
            d.resolve(data[0]);
        });
        return d.promise;
    }
    return service;
}])
.factory('transloc', ['$http', '$q', function($http, $q){
    var baseUrl = 'https://transloc-api-1-2.p.mashape.com/';
    var headers = {'X-Mashape-Key': 'QcvihLtHdgmshtY0Yjsg7nytW4Iqp1MEy05jsnSqvl1Lqjt9eW'};
    var service = {};
    service.getVehicleCount = function () {
        var d = $q.defer();
        $http({
            url: baseUrl + '/vehicles.json',
            params: {
                agencies: '20', 
            },
            headers: headers
        }).success(function (data) {
            var speed = 0;
            angular.forEach(data.data[20], function (v) {
                speed += v.speed;
            });
            d.resolve({count: data.data[20].length, speed: Math.round(speed/data.data[20].length)+'mph'});
        });
        return d.promise;
    }
    return service;
}]);