angular.module('businessTiles', [])
.directive('flipTile', function () {
    return {
        restrict: 'E',
        templateUrl: 'flipTile.html',
        scope: {
            factory: '=',
            cardTitle: '=',
            subtitle: '=',
            valueField: '=',
            method: '=',
            table: '=',
            fields: '=',
            parameters: '=',
            frequency: '='
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
.controller('businessCtrl', ['$scope', function($scope){
    $scope.tiles = [
    {factory:"iris", cardTitle:"Permits Issued Today", subtitle:"Permits Issued Today", valueField:"COUNT", method:"getIrisCount", table:"iris.permits_all_view", fields:"count(*) as count", parameters:"grp_issue_date>= trunc(sysdate)", frequency:"10000"},
    {factory:"transloc", cardTitle:"Buses In Service", subtitle:"in service", valueField:"count", method:"getVehicleCount", frequency:"5000"},
    {factory:"transloc", cardTitle:"Average Bus Speed (mph)", subtitle:"average speed", valueField:"speed", method:"getVehicleCount", frequency:"5000"},
    {factory:"cityworks", cardTitle:"See Click Fix Open Requests", subtitle:"Open in See Click Fix", valueField:"COUNT", method:"getCount", table:"azteca.request", fields:"count(*) as count", parameters:"initiatedby = 'FIX, SEE CLICK' and not (status in ('CANCEL','CANCEL NOT FOUND', 'CANCEL OTHER', 'CLOSED'))", frequency:"10000"}     
    ];
}])
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
.factory('cityworks', ['$http', '$q', function($http, $q){
    var irisUrl = 'http://gisdevarc1/dirt-simple-cwreporting/v1/ws_geo_attributequery.php';
    var service = {};
    service.getCount = function (table, fields, params) {
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
            d.resolve({count: data.data[20].length, speed: Math.round(speed/data.data[20].length)});
        });
        return d.promise;
    }
    return service;
}]);