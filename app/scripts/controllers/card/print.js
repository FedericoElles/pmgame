'use strict';

angular.module('pmgameApp')
  .controller('CardPrintCtrl', function ($scope, $routeParams, $http) {
    $scope.ctrl = {
      type: $routeParams.type,
      cardId: $routeParams.id,
      card:undefined,
      cardLive:undefined,
      formHelper:{
        selectHeroType:['dev','qa','design']  
      },
      saveForm:function(id, doc){
        console.log('Save form callback', id, doc);
        if (id.indexOf('.json') > 0){
          saveFile(id.replace('.json',''), doc);
        } else {
          saveFile('data/'+$routeParams.type+'/'+id, doc);
        }
      }
    };

    function saveFile(path, data){
      $http.post('http://localhost:8080/' + path, JSON.stringify(data)).
      success(function(data, status, headers, config) {
        console.log('saveFile', data);
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Error getting data/type directory', data)
      });    
    }

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
