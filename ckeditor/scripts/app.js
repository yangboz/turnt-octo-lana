/**
 * Created by yangboz on 14-9-25.
 */
var app = angular.module('ckeditorApp', [
    'ngResource',
    "ngRoute"
]);

app.config(function($routeProvider, $locationProvider) {
    /*
    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });
    */
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});

app.controller('MainController', function($scope, $http, UserService, Base64, $rootScope, $location){
///Basic

});

/**
 * ckeditor Directive
 */
app.directive('ckeditor', function() {
    return {
        require : '?ngModel',
        link : function(scope, element, attrs, ngModel) {
            var ckeditor = CKEDITOR.replace(element[0], {

            });
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function() {
                ckeditor.setData(ngModel.$viewValue);
            });
            ckeditor.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ckeditor.getData());
                });
            });
            ngModel.$render = function(value) {
                ckeditor.setData(ngModel.$viewValue);
            };
        }
    };
});
