'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'myApp.home','myApp.searchpage', 'myApp.gig',])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({redirectTo: '/'});
}]);