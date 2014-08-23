'use strict';

angular.module('pmgameApp')
  .controller('CardEditCtrl', function ($scope, $routeParams, $http) {
    $scope.ctrl = {
      type: $routeParams.type,
      cardId: $routeParams.id,
      card:undefined,
      formHelper:{},
      saveForm:function(formFields){
        console.log('Save form callback', formFields);
      }
    };
    
    $http.get('http://localhost:8080/data/'+$routeParams.type+'/'+$routeParams.id).
    success(function(data, status, headers, config) {
      $scope.ctrl.card = data;
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Error getting data/type directory', data)
    });    
  });
