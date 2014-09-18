/**
 * Created by yangboz on 14-9-18.
 */
var myApp = angular.module('myApp', ['ui.bootstrap']);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

function NavBarCtrl($scope) {
    $scope.isCollapsed = true;
}