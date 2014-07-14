'use strict';

angular.module('pmgameApp')
  .controller('CardsTypeCtrl', function ($scope, $routeParams, $http) {
    $scope.ctrl = {
      type: $routeParams.type,
      cards:[]
    };
    
    $http.get('http://localhost:8080/data/'+$routeParams.type).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Error getting data/type directory', data)
    });    
  });
