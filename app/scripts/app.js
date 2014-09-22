'use strict';

angular
  .module('pmgameApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularLazyForm'
  ])
  .run(function($rootScope, $route) {
    $rootScope.isTab = function (tab ){
      if ($route.current){
        //TODO Must fix case that activeTab is not defined
        return $route.current.data.activeTab === tab;  
      } else {
        return false;
      }
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data:{
          activeTab:'main'
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        data:{
          activeTab:'about'
        }
      })
      .when('/cards', {
        templateUrl: 'views/cards.html',
        controller: 'CardsCtrl',
        data:{
          activeTab:'card'
        }
      })
      .when('/cards/:type', {
        templateUrl: 'views/cards/type.html',
        controller: 'CardsTypeCtrl',
        data:{
          activeTab:'card'
        }
      })
      .when('/cards/:type/edit/:id', {
        templateUrl: 'views/edit/edit.html',
        controller: 'CardEditCtrl',
        data:{
          activeTab:'card'
        }
      })      
      .when('/cards/:type/print/:id', {
        templateUrl: 'views/print/print.html',
        controller: 'CardPrintCtrl',
        data:{
          activeTab:'card'
        }
      })        
      .otherwise({
        redirectTo: '/'
      });
  });
