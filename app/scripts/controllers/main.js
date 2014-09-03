'use strict';

angular.module('pmgameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.ctrl = {
	    card:{
		    title:'PM',
		    name:'Der Projektmanager',
		    textDesc:'Der Projektmanager hat die Aufgabe, die Erwartungen der Stakeholder an das Projekt so weit wie möglich zu erfüllen.',
		    textQuote:'Eine Person die glaubt, dass neun Frauen ein Baby in einem Monat abliefern können.',
		    cost:0,
		    urlImg:'http://productlabs.co/wp-content/uploads/2012/08/pm.png',
		    abilities:{
			    magic:0,
			    strength:0,
			    defense:0
		    }
	    }
    };
  });
