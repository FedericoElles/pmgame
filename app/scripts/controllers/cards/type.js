'use strict';

angular.module('pmgameApp')
  .controller('CardsTypeCtrl', function ($scope, $routeParams) {
    $scope.ctrl = {
      type: $routeParams.type
    };
  });
