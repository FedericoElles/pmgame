'use strict';

angular.module('pmgameApp')
  .controller('CardsCtrl', function ($scope, $http) {
    $scope.types = [
      'heroes',
      'quests',
      'events'
    ];
    
    $http.get('http://localhost:8080/data').
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Error getting data directory', data)
    });
    
  });
