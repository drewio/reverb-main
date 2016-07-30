'use strict';

// Set up the main module
angular.module('myApp.gig', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:searchid/:gigid', {
        templateUrl: 'views/view_gig/gig.html',
        controller: 'GigCtrl',
	});
}])

.controller('GigCtrl', [function() {

}]);