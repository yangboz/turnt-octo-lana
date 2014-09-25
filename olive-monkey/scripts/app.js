/**
 * Created by yangboz on 14-9-24.
 */
var app = angular.module('rushuApp', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui",
    "ui.chart"
]);

app.value('charting', {
    pieChartOptions: {
        seriesDefaults: {
            // Make this a pie chart.
            renderer: jQuery.jqplot.PieRenderer,
            rendererOptions: {
                // Put data labels on the pie slices.
                // By default, labels show the percentage of the slice.
                showDataLabels: true
            }
        },
        legend: { show:true, location: 'e' }
    }
});

app.controller('DemoCtrl', function ($scope, charting) {
    $scope.someData = [[
        ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14],
        ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
    ]];

    $scope.myChartOpts = charting.pieChartOptions;
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/',          {templateUrl: "views/home.html"});
    $routeProvider.when('/eems',    {templateUrl: "views/eems.html"});
    $routeProvider.when('/reports',      {templateUrl: "views/reports.html"});
    $routeProvider.when('/stats',   {templateUrl: "views/stats.html"});
    $routeProvider.when('/me',     {templateUrl: "views/me.html"});
});


 app.service('analytics', [
 '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
 var send = function(evt, data) {
 ga('send', evt, data);
 }
 }
 ]);

app.controller('MainController', function($rootScope, $scope, analytics){

    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.loading = true;
        //Overlay login
        $rootScope.toggle('loginOverlay',$scope.user.loggedin?'off':'on');
    });

    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.loading = false;
    });

    var scrollItems = [];

    for (var i=1; i<=100; i++) {
        scrollItems.push("Item " + i);
    }

    $scope.scrollItems = scrollItems;
    $scope.invoice = {payed: true};

    $scope.userAgent =  navigator.userAgent;
    $scope.chatUsers = [
        { name: "Carlos  Flowers", online: true },
        { name: "Byron Taylor", online: true },
        { name: "Jana  Terry", online: true },
        { name: "Darryl  Stone", online: true },
        { name: "Fannie  Carlson", online: true },
        { name: "Holly Nguyen", online: true },
        { name: "Bill  Chavez", online: true },
        { name: "Veronica  Maxwell", online: true },
        { name: "Jessica Webster", online: true },
        { name: "Jackie  Barton", online: true },
        { name: "Crystal Drake", online: false },
        { name: "Milton  Dean", online: false },
        { name: "Joann Johnston", online: false },
        { name: "Cora  Vaughn", online: false },
        { name: "Nina  Briggs", online: false },
        { name: "Casey Turner", online: false },
        { name: "Jimmie  Wilson", online: false },
        { name: "Nathaniel Steele", online: false },
        { name: "Aubrey  Cole", online: false },
        { name: "Donnie  Summers", online: false },
        { name: "Kate  Myers", online: false },
        { name: "Priscilla Hawkins", online: false },
        { name: "Joe Barker", online: false },
        { name: "Lee Norman", online: false },
        { name: "Ebony Rice", online: false }
    ];

    $scope.user = {username:'',password:'',loggedin:false};

});