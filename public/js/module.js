'use strict';

var app = angular.module('angularApp', ['ui.router', 'satellizer']);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/html/main.html',
            controller: 'homeCtrl'

        })
        .state('register', {
            url: '/newuser/',
            templateUrl: '/html/register.html',
            controller: 'registerCtrl'
        })
        .state('newlisting', {
            url: '/newlisting/',
            templateUrl: '/html/newlisting.html',
            controller: 'newListingCtrl',
            resolve: {
                storeLoggedIn: function(userService) {
                    return userService.getProfile()
                        .then(user => {
                            return user
                        });
                }
            }
        })
        .state('storeregister', {
            url: '/newstore/',
            templateUrl: '/html/storereg.html',
            controller: 'storeRegisterCtrl'
        })
        .state('storeprofile', {
            url: '/storeprofile/',
            templateUrl: '/html/storeprofile.html',
            controller: 'storeProfileCtlr',
            resolve: {
                storeLoggedIn: function(userService) {
                    return userService.getProfile()
                        .then(user => {
                            return user
                        });
                }
            }
        })
        .state('listings', {
            url: '/listings/',
            templateUrl: '/html/viewlistings.html',
            controller: 'listingCtrl',
            resolve: {
                listings: function(listingService) {
                    return listingService.getAll()
                        .then(listings => {
                            return listings
                        });
                }
            }

        })
        .state('stores/all', {
            url: '/stores/all',
            templateUrl: '/html/viewstores.html',
            controller: 'viewStoresCtrl',
            resolve: {
                stores: function(storeService) {
                    return storeService.getAll()
                        .then(stores => {
                            return stores
                        });
                }
            }
        })

            $urlRouterProvider.otherwise('/');

})
