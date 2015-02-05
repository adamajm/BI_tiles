var module = angular.module('flip', []);
module.controller('flipCtrl', function($scope) {});
 
function getPermitsToday($scope, $http) {
    //$http.get('http://rest-service.guides.spring.io/greeting').
    var myURL = 'http://gisdevarc1/dirt-simple-iris/v1/ws_geo_attributequery.php?table=iris.permits_all_view&parameters=grp_issue_date%3E%3D%20trunc(sysdate)&fields=count(*)%20as%20count';    success(function(data) {
        	//angular.forEach(data, function (id, i) {
          	//$scope.activeids.push(id.Count);
			$scope.permitCount = data[0];
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            if (minutes < 10){
                minutes = "0" + minutes;
            }
            var suffix = "AM";

            if (hours >= 12) {
                suffix = "PM";
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
            //var current_time = hours + ":" + minutes + " " + suffix;
            $scope.currentTime = hours + ":" + minutes + " " + suffix;

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
	