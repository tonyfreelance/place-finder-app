'use strict';

angular
    .module('PlaceFinderApp', ['ngRoute', 'toastr', 'satellizer', 'ngCookies'])
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider', '$authProvider'];

function config($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    // Now set up the states
    // $routeProvider
    //     .when('/', {
    //         templateUrl: '/',
    //         controller: 'MainController',
    //         controllerAs: 'vm'
    //     })
    //     .otherwise({
    //         redirectTo: '/'
    //     });
    
    
    // To avoid the CORS error
    $authProvider.httpInterceptor = false;

    $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin + '/auth/twitter/callback',
        type: '1.0',
        popupOptions: {
            width: 495,
            height: 645
        }
    });
}
