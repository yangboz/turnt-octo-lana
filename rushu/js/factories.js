'use strict';

angular.module('rateaskater.factories', [])
    .factory('instagramsFactory', function ($http, $q) {
        var instagramsFactory = {};

        instagramsFactory.getPicOfTheWeek = function () {
            return $http.get('/api/pics/pic-of-the-week');
        };

        instagramsFactory.getClipOfTheWeek = function () {
            return $http.get('/api/clips/clip-of-the-week');
        };

        instagramsFactory.getPics = function (page) {
            return $http.get('/api/pics?page=' + page);
        };

        instagramsFactory.getClips = function (page) {
            return $http.get('/api/clips?page=' + page);
        };

        instagramsFactory.getPicCount = function () {
            return $http.get('/api/pics/count');
        };

        instagramsFactory.getClipCount = function () {
            return $http.get('/api/clips/count');
        };

        instagramsFactory.getPic = function (id) {
            return $http.get('/api/pics/' + id);
        };

        instagramsFactory.getClip = function (id) {
            return $http.get('/api/clips/' + id);
        };

        instagramsFactory.rate = function (id, rating) {
            return $http.post('/api/instagrams/' + id + '/rate', { rating: rating });
        };

        return instagramsFactory;
    });
