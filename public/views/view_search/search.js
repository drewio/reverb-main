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
            console.log('ads')

            // This is the promise used to communicate with the backend
            var promise = $http({
                method: 'GET', 
                url: 'http://localhost:3000/userid?id=' + $route.current.params.searchid
            })

            // What to do if the shit is returned.
            .success(function(data, status, headers, config) {
                //console.log(data);
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
    $scope.username = document.getElementById('route-view').getAttribute('searchid') || 'Users';

    $scope.resetAttr = function () {
        console.log('back')
    }

    var venues = []

    $scope.result = GET_SEARCH;
    var gigs = $scope.result.data;
    console.log(gigs);
    for(var i = 0; i < 30; i++){
        venues.push(gigs[i]);
    }
    $scope.users = venues;

    $scope.open_modal = function (index) {
        $scope.modal_data = $scope.users[index];
        document.getElementById("lolol").classList.add("is-active")
    }

    $scope.close_modal = function () {
        document.getElementById("lolol").classList.remove("is-active")
        $scope.modal_data = null;
    }
}]);