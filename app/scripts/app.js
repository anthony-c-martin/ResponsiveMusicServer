'use strict';

angular
    .module('musicServerApp', [
        'musicServerViews',
        'ngRoute',
        'matchmedia-ng'
    ])
    .config(['matchmediaProvider',
        function(matchmediaProvider) {
            matchmediaProvider.rules.desktop = '(min-width: 56em)';
        }])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
            when('/login', {
                controller: 'LoginController',
                templateUrl: 'login.html',
                title: 'Login'
            }).
            when('/artists', {
                controller: 'ArtistViewController',
                activeTab: 'artists',
                templateUrl: 'artists.html',
                title: 'Artists'
            }).
            when('/artists/s/:search', {
                controller: 'ArtistViewController',
                activeTab: 'artists',
                templateUrl: 'artists.html',
                title: 'Artists: search'
            }).
            when('/albums', {
                controller: 'AlbumViewController',
                activeTab: 'albums',
                templateUrl: 'albums.html',
                title: 'Albums'
            }).
            when('/albums/s/:search', {
                controller: 'AlbumViewController',
                activeTab: 'albums',
                templateUrl: 'albums.html',
                title: 'Albums: search'
            }).
            when('/tracks', {
                controller: 'TrackViewController',
                activeTab: 'tracks',
                templateUrl: 'tracks.html',
                title: 'Tracks'
            }).
            when('/tracks/s/:search', {
                controller: 'TrackViewController',
                activeTab: 'tracks',
                templateUrl: 'tracks.html',
                title: 'Tracks: search'
            }).
            otherwise({
                redirectTo: '/login'
            });
        }]);
