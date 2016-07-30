'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:searchid/:gigid', {
        templateUrl: 'views/view_home/home.html',
        controller: 'HomeCtrl',
	});
}])

.controller('HomeCtrl', [function() {

}]);