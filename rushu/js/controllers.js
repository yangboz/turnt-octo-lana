'use strict';

angular.module('rateaskater.controllers', [])

    .controller('NavController', function ($scope, $location) {
        $scope.isCollapsed = true;

        $scope.$on('$routeChangeSuccess', function () {
            $scope.isCollapsed = true;
        });

        $scope.getClass = function (path) {
            if(path === '/') {
                if($location.path() === '/') {
                    return "active";
                } else {
                    return "";
                }
            }

            if ($location.path().substr(0, path.length) === path) {
                return "active";
            } else {
                return "";
            }
        }
    })

    .controller('HomeController', function ($scope, $rootScope, $location, instagramsFactory, $sce) {
        $rootScope.noIndexFollow = false;
        $rootScope.metaTitle = "Pic and Clip of the Week - " + $rootScope.globals.siteTitle;

        var range = [];
        for (var i = 1; i <= 10; i++) {
            range.push(i);
        }
        $scope.range = range;

        instagramsFactory.getPicOfTheWeek().success(function (pic) {
            $scope.pic = pic;

            $scope.ratePic = function (rating) {
                instagramsFactory.rate(pic.id, rating).success(function (data) {
                    pic.yourRating = rating;
                    pic.ratings.average = data.average;
                    pic.ratings.count = data.count;
                });
            };

            $scope.picFbCommentsUrl = $location.absUrl() + "pics/" + pic.id;
        });

        instagramsFactory.getClipOfTheWeek().success(function (clip) {
            $scope.clip = clip;
            $scope.clip.videoUrl = $sce.trustAsResourceUrl(clip.videoUrl);

            $scope.rateClip = function (rating) {
                instagramsFactory.rate(clip.id, rating).success(function (data) {
                    clip.yourRating = rating;
                    clip.ratings.average = data.average;
                    clip.ratings.count = data.count;
                });
            };

            $scope.clipFbCommentsUrl = $location.absUrl() + "clips/" + clip.id;
        });
    })

    .controller('PicsController', function ($scope, $rootScope, $location, $routeParams, instagramsFactory) {
        $rootScope.noIndexFollow = false;
        $rootScope.metaTitle = "Pics - " + $rootScope.globals.siteTitle;

        $scope.page = $routeParams.p || 1;
        $scope.selectPage = function (page) {
            $location.path('/pics').search('p', page);
            return;
        };

        instagramsFactory.getPics($scope.page).success(function (pics) {
            $scope.pics = pics;
        });

        instagramsFactory.getPicCount().success(function (picCount) {
            $scope.picCount = picCount;
        });
    })

    .controller('ClipsController', function ($scope, $rootScope, $location, $routeParams, instagramsFactory) {
        $rootScope.noIndexFollow = false;
        $rootScope.metaTitle = "Clips - " + $rootScope.globals.siteTitle;

        $scope.page = $routeParams.p || 1;
        $scope.selectPage = function (page) {
            $location.path('/clips').search('p', page);
            return;
        };

        instagramsFactory.getClips($scope.page).success(function (clips) {
            $scope.clips = clips;
        });

        instagramsFactory.getClipCount().success(function (clipCount) {
            $scope.clipCount = clipCount;
        });
    })

    .controller('PicController', function ($scope, $rootScope, $routeParams, $location, instagramsFactory) {
        $rootScope.noIndexFollow = true;

        var range = [];
        for (var i = 1; i <= 10; i++) {
            range.push(i);
        }
        $scope.range = range;

        $scope.fbCommentsUrl = $location.absUrl();

        instagramsFactory.getPic($routeParams.id)
            .success(function (pic) {
                $scope.pic = pic;

                $rootScope.metaTitle = pic.username + " - " + pic.caption + " - " + $rootScope.globals.siteTitle;

                $scope.rate = function (rating) {
                    instagramsFactory.rate(pic.id, rating).success(function (data) {
                        pic.yourRating = rating;
                        pic.ratings.average = data.average;
                        pic.ratings.count = data.count;
                    });
                };
            })
            .error(function () {
                $location.path('/pics');
            });
    })

    .controller('ClipController', function ($scope, $rootScope, $routeParams, $location, instagramsFactory, $sce) {
        $rootScope.noIndexFollow = true;

        var range = [];
        for (var i = 1; i <= 10; i++) {
            range.push(i);
        }
        $scope.range = range;

        $scope.fbCommentsUrl = $location.absUrl();

        instagramsFactory.getClip($routeParams.id)
            .success(function (clip) {
                $scope.clip = clip;
                $scope.clip.videoUrl = $sce.trustAsResourceUrl(clip.videoUrl);

                $rootScope.metaTitle = clip.username + " - " + clip.caption + " - " + $rootScope.globals.siteTitle;

                $scope.rate = function (rating) {
                    instagramsFactory.rate(clip.id, rating).success(function (data) {
                        clip.yourRating = rating;
                        clip.ratings.average = data.average;
                        clip.ratings.count = data.count;
                    });
                };
            })
            .error(function () {
                $location.path('/clips');
            });
    });
