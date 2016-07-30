'use strict';

// Set up the main module
angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
        templateUrl: 'views/view_home/home.html',
        controller: 'HomeCtrl',
	});
}])

.controller('HomeCtrl', [function() {

}]);