'use strict';

describe('Controller: CardsTypeCtrl', function () {

  // load the controller's module
  beforeEach(module('pmgameApp'));

  var CardsTypeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CardsTypeCtrl = $controller('CardsTypeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
