'use strict';

angular.module('rateaskater.directives', [])
    .directive('fbLike', function () {
        return {
            restrict: 'E',
            //template: '<div class="fb-like" data-href="{{page}}" data-colorscheme="light" data-layout="box_count" data-action="like" data-show-faces="true" data-send="false"></div>'
            template: '<div class="fb-like" data-layout="standard" data-action="like" data-show-faces="true" data-share="false"></div>',
            replace: true
        }
    })
    .directive('fbComments', function () {
        return {
            restrict: 'E',
            scope: {
                fbCommentsUrl: '=url'
            },
            template: '<div class="fb-comments" data-href="{{fbCommentsUrl}}" data-numposts="5" data-colorscheme="dark"></div>',
            link: function (scope, element, attrs) {
                scope.$watch('fbCommentsUrl', function (newValue, oldValue) {
                    if (newValue) {
                        if (typeof FB !== "undefined" && FB !== null) {
                            FB.XFBML.parse(element.parent()[0]);
                        }
                    }
                }, true);
            },
            replace: true
        }
    })
    .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });
            },
            replace: true
        }
    })
    .directive('disqusOld', function () {
        return {
            restrict: 'E',
            template: '<div id="disqus_thread"></div>',
            link: function (scope, element, attrs) {
                /* * * CONFIGURATION VARIABLES * * */
                var disqus_shortname = 'rateaskater';
                //var disqus_identifier = attrs.id;
                //var disqus_title = attrs.title;
                //var disqus_url = 'http://www.rateaskater.com/#!/pics/' + attrs.id;

                /* * * DON'T EDIT BELOW THIS LINE * * */
                (function () {
                    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                })();

                attrs.$observe('id', function (id) {
                    if (!id) {
                        return;
                    }

                    DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.identifier = attrs.id;
                            this.page.url = window.location.href; //'http://www.rateaskater.com/#!/pics/' + attrs.id;
                        }
                    });
                });
            }
        }
    });
