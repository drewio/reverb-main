'use strict';

// Set up the main module
angular.module('myApp.gig', ['ngRoute'])

// Configure the router
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/:searchid/:gigid', {

        templateUrl: 'views/view_gig/gig.html',
        controller: 'GigCtrl',
        resolve: {
            GET_GIG: function(GET_GIG){
                return GET_GIG.getMessage();
            }
        }

	});

}])

// Factory used to make the backend calls
.factory("GET_GIG", ["$q", "$http", "$route", "$location", function($q, $http, $route, $location){
    return {
        getMessage: function(){
            // These are the parameters used to call the backend
            console.log($route.current.params);

            // This is the promise used to communicate with the backend
            var promise = $http({
                method: 'GET', 
                url: 'https://www.reddit.com/.json'
            })

            // What to do if the shit is returned.
            .success(function(data, status, headers, config) {
                return data;
             })

            // Run this shit if NO USER FOUND IN THE DATABASE
            .error(function(data, status, headers, config) {
                $location.url('/');
            });

            // Return a promise when it works.
            return promise;
        }
    };
}])

// Configure th
.controller('GigCtrl', ['$scope', 'GET_GIG', function($scope, GET_GIG) {
    $scope.result = GET_GIG;
}]);
