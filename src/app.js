(function() {
    'use strict';

    angular.module('OpenFinD3FC', [
        'ngRoute',
        'openfin.thumbnails',
        'openfin.search',
        'openfin.stock',
        'openfin.favourites',
        'openfin.sidebar'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: 'stocks'
            })
            .when('/stocks/', {
                templateUrl: 'thumbnails/thumbnails.html',
                controller: 'ThumbnailsCtrl',
                controllerAs: 'thumbnailsCtrl'
            })
            .when('/stock/:query', {
                templateUrl: 'sidebars/search/search-preview.html',
                controller: 'StockCtrl',
                controllerAs: 'stockCtrl'
            })
            .otherwise({
                redirectTo: function() {
                    window.location = '404.html';
                }
            });
    }]);
}());
