'use strict';

angular.module('rateaskater', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ngDisqus',
    'rateaskater.factories',
    'rateaskater.controllers',
    'rateaskater.directives'
])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                controller: 'HomeController',
                templateUrl: 'partials/login.html'
            })

            .when('/pics', {
                controller: 'PicsController',
                templateUrl: 'partials/register.html'
            })

            .when('/clips', {
                controller: 'ClipsController',
                templateUrl: 'partials/clips.html'
            })

            .when('/pics/:id', {
                controller: 'PicController',
                templateUrl: 'partials/pic.html'
            })

            .when('/clips/:id', {
                controller: 'ClipController',
                templateUrl: 'partials/clip.html'
            })

            .when('/post-a-pic', {
                templateUrl: 'partials/post-a-pic.html'
            })

            .otherwise({ redirectTo: '/' });

        $locationProvider.hashPrefix('!');
    })

    .run(function ($rootScope, $location, $window) {
        if ($location.host().indexOf('rateaskater') !== -1) {
            $rootScope.globals = {
                siteTitle: 'Rushu',
                tag: 'rateaskater'
            };
            $window.ga('create', 'UA-48364854-1', 'rateaskater.com');
            $window.disqus_shortname = 'rateaskater';
        } else if ($location.host().indexOf('poledance') !== -1) {
            $rootScope.globals = {
                siteTitle: 'InstaPoleDance',
                tag: 'instapoledance'
            };
            $window.ga('create', 'UA-51304462-1', 'instapoledance.com');
            $window.disqus_shortname = 'instapoledance';
        } else if ($location.host().indexOf('instacapoeira') !== -1) {
            $rootScope.globals = {
                siteTitle: 'Insta Capoeira',
                tag: 'instacapoeira'
            };
            $window.ga('create', 'UA-48364854-2', 'instacapoeira.herokuapp.com');
            $window.disqus_shortname = 'instacapoeira';
        }

        $rootScope.$on('$viewContentLoaded', function (event) {
            $window.ga('send', 'pageview', $location.path());
        });
    });
