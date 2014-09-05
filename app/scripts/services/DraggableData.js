'use strict';

angular.module('musicServerApp')
    .service('DraggableData', ['$q', 'HttpRequest', 'Playlist',
        function($q, HttpRequest, Playlist) {
            var $dragDiv = false;
            var currentDeferred = $q.defer();
            currentDeferred.reject();

            function setTracks(tracks) {
                currentDeferred = $q.defer();
                var trackList = [];

                angular.forEach(tracks, function(track) {
                    this.push(track);
                }, trackList);

                currentDeferred.resolve(trackList);
            }

            function setArtists(artists) {
                currentDeferred = $q.defer();
                var trackList = [];

                var promises = [];
                angular.forEach(artists, function(artist) {
                    var deferred = $q.defer();
                    promises.push(HttpRequest.track.getFromArtist(artist.ID).load().then(function(tracks) {
                        angular.forEach(tracks, function(track) {
                            this.push(track);
                        }, trackList);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    }));
                });

                $q.all(promises).then(function() {
                    currentDeferred.resolve(trackList);
                }, function() {
                    currentDeferred.reject();
                });
            }

            function setAlbums(albums) {
                currentDeferred = $q.defer();
                var trackList = [];

                var promises = [];
                angular.forEach(albums, function(album) {
                    var deferred = $q.defer();
                    promises.push(HttpRequest.track.getFromAlbum(album.ID).load().then(function(tracks) {
                        angular.forEach(tracks, function(track) {
                            this.push(track);
                        }, trackList);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    }));
                });

                $q.all(promises).then(function() {
                    currentDeferred.resolve(trackList);
                }, function() {
                    currentDeferred.reject();
                });
            }

            function getDragImage(itemType, itemCount) {
                if (!$dragDiv) {
                    $dragDiv = $('<div/>');
                    document.body.appendChild($dragDiv[0]);
                    $dragDiv[0].setAttribute('style', 'position: absolute; display: block; top: -500; left: -500;');
                }

                $dragDiv.text(itemCount.toString() + ' ' + itemType + ((itemCount > 1) ? 's' : ''));
                return $dragDiv[0];
            }

            function getTracks() {
                return currentDeferred.promise;
            }

            this.bindDragEvents = function($element, item, itemType, itemListFunction, itemSelectedFunction) {
                $element.on('dragstart', function($event) {
                    if (!itemSelectedFunction()) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        return;
                    }

                    var itemList = itemListFunction();
                    $event.originalEvent.dataTransfer.setDragImage(getDragImage(itemType, itemList.length), -10, -10);

                    switch (itemType) {
                        case 'Track':
                            setTracks(itemList);
                            break;
                        case 'Artist':
                            setArtists(itemList);
                            break;
                        case 'Album':
                            setAlbums(itemList);
                            break;
                    }
                });
            };

            this.bindDropEvents = function($element) {
                $element.on('dragover', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                });

                $element.on('drop', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    getTracks().then(function(tracks) {
                        Playlist.addTracks(tracks);
                    });
                    Playlist.deselectAll();
                });
            };
        }]);
