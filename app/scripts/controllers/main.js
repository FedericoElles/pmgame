'use strict';

angular.module('pmgameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.ctrl = {
	    card:{
		    _id:1,
		    type:'dev', //design //qa
		    category:'common',
		    title:'PM',
		    name:'Der Projektmanager',
		    desc:'Der Projektmanager hat die Aufgabe, die Erwartungen der Stakeholder an das Projekt so weit wie möglich zu erfüllen.',
		    ability:'',
		    quote:'Eine Person die glaubt, dass neun Frauen ein Baby in einem Monat abliefern können.',
		    cost:0,
		    costArray: new Array(0),
		    img:'http://productlabs.co/wp-content/uploads/2012/08/pm.png',
		    abilities:{
			    magic:0,
			    strength:0,
			    defense:0
		    }
	    }
    };
  });
