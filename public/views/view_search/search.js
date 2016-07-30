'use strict';

// Set up the main module
angular.module('myApp.searchpage', ['ngRoute'])

// Configure the router
.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/:searchid', {

        templateUrl: 'views/view_search/search.html',
        controller: 'SearchCtrl',
        resolve: {
            GET_SEARCH: function(GET_SEARCH){
                return GET_SEARCH.getMessage();
            }
        }

    });
}])

// Factory used to make the backend calls
.factory("GET_SEARCH", ["$q", "$http", "$route", "$location", function($q, $http, $route, $location){
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
.controller('SearchCtrl', ['$scope', 'GET_SEARCH', function($scope, GET_SEARCH) {
    $scope.result = GET_SEARCH;
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max', 'Nice', 'Start', 'Mate', 'Do', 'You', 'Even', 'Lift', 'Brah']
}]);