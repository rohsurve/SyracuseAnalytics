app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: "/home",
            views: {
                '': {templateUrl: 'static/partials/home.html'},

                'ratings@home': {
                    templateUrl: 'static/partials/ratings.html',
                    controller: 'RatingController',
                },

            }
        })
        .state('overview', {
            url: '/overview',
            templateUrl: 'static/partials/overview.html',
            controller: 'OverviewController',
        })
        .state('prediction', {
            url: '/prediction',
            templateUrl: 'static/partials/prediction.html',
            controller: 'PredictionController',
        }).state('aboutus', {
        url: '/aboutus',
        templateUrl: 'static/partials/aboutus.html',
        controller: 'AboutUsController',
    })
});