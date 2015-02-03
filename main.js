var module = angular.module('flip', []);
module.controller('flipCtrl', function($scope) {});
 
function getPermitsToday($scope, $http) {
    //$http.get('http://rest-service.guides.spring.io/greeting').
    $http.get('http://gisdevarc1/dirt-simple-iris/v1/ws_geo_attributequery.php?table=iris.permits_all_view&parameters=grp_issue_date%3E%3D%20sysdate&fields=count(*)%20as%20count').
        success(function(data) {
        	//angular.forEach(data, function (id, i) {
          	//$scope.activeids.push(id.Count);
			$scope.permitCount = data[0];
        	});
		}
function getLastFive($scope, $http) {
    //$http.get('http://rest-service.guides.spring.io/greeting').
    $http.get('http://gisdevarc1/dirt-simple-iris/v1/ws_geo_attributequery.php?table=iris.permits_all_view&parameters=grp_issue_date%3E%3D%20sysdate').
        success(function(data) {
        	//angular.forEach(data, function (id, i) {
          	//$scope.activeids.push(id.Count);
			$scope.greeting = data[0];
        	});
		}
	