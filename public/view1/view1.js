'use strict';

angular.module('myApp.view1', ['ngRoute'])

// Factory used to make the backend calls
.factory("search", ["$q", "$http", "$route", function($q, $http, $route){
    return {
        getMessage: function(){
        	// These are the parameters used to call the backend
            console.log($route.current.params);

            // This is the promise used to communicate with the backend
            var promise = $http({
            	method: 'GET', 
            	url: 'https://www.reddit.com/.json'
        	})

            // What to do when the data comes back
            .success(function(data, status, headers, config) {
                 return data;
             });

            // Return a promise when it works.
            return promise;
        }
    };
}])

// Configure the router
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/view1', {

		templateUrl: 'view1/view1.html',
		controller: 'View1Ctrl',
		resolve: {
			search: function(search){
				return search.getMessage();
			}
      	}

	});
}])

// Configure th
.controller('View1Ctrl', ['$scope', 'search', function($scope, search) {
	$scope.hello = search;
}]);