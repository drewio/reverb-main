'use strict';

// Set up the main module
angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
        templateUrl: 'views/view_home/home.html',
        controller: 'HomeCtrl',
	});
}])

.controller('HomeCtrl', ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
	var searchid = document.getElementById('route-view').getAttribute('searchid');
	console.log(searchid);
	if (searchid !== "<%=searchid%>") {
		$location.url('/' + searchid);
	}
	
	//console.log($rootScope)
	//$scope.$watch('fuck', fuckwatch, true);
    //function fuckwatch() {
    //    console.log($scope);
    //}

}]);