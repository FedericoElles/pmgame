'use strict';

angular.module('pmgameApp')
    .directive('card', function () {
        return {
            restrict: 'E',
            //require: '?ngModel', // get a hold of NgModelController
            scope: {
                'card': '=cardData',
                'id': '=?'
            },
            controller: function ($scope) {
                $scope.ctrl = {
                    category: undefined,
                    id:undefined,
                    costArray:[]
                };
                $scope.lov = {
                    types: {
                        'dev': 'Entwickler',
                        'qa': 'Qualitaet Sicherung',
                        'design': 'Design'
                    }
                };
            },
            template: "<div class=\"card {{card.selectHeroType}} {{ctrl.category}}\">\n" +
            "\n" +
            "	<card-footer class=\"text-center\">\n" +
            "		PM - The Game\n" +
            "	</card-footer>\n" +
            "\n" +
            "	<card-title>\n" +
            "		<span ng-bind=\"card.title\"></span>\n" +
            "		<small ng-bind=\"card.name\"></small>\n" +
            "		<span ng-repeat=\"i in ctrl.costArray track by $index\" class=\"coin text-warning pull-right\">\n" +
            "			<i class=\"icon-euro\" ></i>\n" +
            "		</span>\n" +
            "		\n" +
            "		<span class=\"points\" ng-show=\"card.points\"><i class=\"icon-star\"></i><span ng-bind=\"card.points\"></span></span>\n" +
            "	</card-title>\n" +
            "	\n" +
            "	<card-img style=\"background-image:url({{card.urlImg}})\" class=\"img-polaroid\"></card-img>\n" +
            "	<card-subtitle ng-bind=\"lov.types[card.selectHeroType]\"></card-subtitle>\n" +
            "	\n" +
            "	<card-abilities ng-if=\"card.abilities\">\n" +
            "		<div class=\"ability text-error\"   ng-class=\"{disabled:card.abilities.magic==0}\">\n" +
            "			<i class=\"icon-magic\"></i><span ng-bind=\"card.abilities.magic\"></span></div>\n" +
            "		<div class=\"ability text-info\"    ng-class=\"{disabled:card.abilities.strength==0}\">\n" +
            "			<i class=\"icon-bolt\"></i><span ng-bind=\"card.abilities.strength\"></span></div>\n" +
            "		<div class=\"ability text-success\" ng-class=\"{disabled:card.abilities.defense==0}\">\n" +
            "			<i class=\"icon-shield\" ></i><span ng-bind=\"card.abilities.defense\"></span></div>\n" +
            "		<div class=\"ability muted\" ng-show=\"card.time\">\n" +
            "			<i class=\"icon-time\" ></i><span ng-bind=\"card.time\"></span></div>\n" +
            "		<div class=\"ability text-reward\" ng-show=\"card.reward\">\n" +
            "			<i class=\"icon-euro\" ></i><span ng-bind=\"card.reward\"></span></div>			\n" +
            "	</card-abilities>\n" +
            "	<card-desc>\n" +
            "		<p ng-bind=\"card.textDesc\"></p>\n" +
            "		\n" +
            "		<p ng-if=\"card.textAbility\">\n" +
            "			<strong ng-bind=\"card.textAbility\"></strong>\n" +
            "		</p>\n" +
            "		<blockquote ng-show=\"card.textQuote\" ng-bind=\"card.textQuote\"></blockquote>\n" +
            "		\n" +
            "	</card-desc>\n" +
            "	\n" +
            "\n" +
            "	\n" +
            "</div>\n" +
            "\n" +
            "<!--\n" +
            "<pre>\n" +
            "	{{card |json}}\n" +
            "</pre>\n" +
            "-->",
            link: function (scope, element, attrs, ngModel) {
                scope.$watch(function(){return scope.card}, function(newval){
                    console.log('newCard', scope.id);
                    var idParts = scope.id.replace('data/','').split('/');
                    scope.ctrl.category = idParts[0];
                    scope.ctrl.id = idParts[1].replace('.json','');
                    for (var i = 0, ii=scope.card.cost;i<ii;i+=1){
                        scope.ctrl.costArray.push('X');
                    }
                }, true);
            }
        };
    });
