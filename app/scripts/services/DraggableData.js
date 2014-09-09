'use strict';

angular.module('musicServerApp')
    .service('DraggableData', ['$q', 'HttpRequest', 'Playlist',
        function($q, HttpRequest, Playlist) {
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
                var $dragImage = $('.drag-image');

                $dragImage.text(itemCount.toString() + ' ' + itemType + ((itemCount > 1) ? 's' : ''));
                return $dragImage[0];
            }

            function getTracks() {
                return currentDeferred.promise;
            }

            /* To ensure that $scope.$apply is called, but to avoid calling $scope.$apply unnecessarily,
             * this function will only call $scope.$apply if changes have been made.
            */
            function changeScopeVariable(scope, dragoverPre, dragoverPost) {
                var changed = false;

                if (scope.dragoverPost !== dragoverPost) {
                    scope.dragoverPost = dragoverPost;
                    changed = true;
                }
                if (scope.dragoverPre !== dragoverPre) {
                    scope.dragoverPre = dragoverPre;
                    changed = true;
                }

                if (changed) {
                    scope.$apply(function() { });
                }
            }

            var currentHoverScope;
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

                $element.on('dragend', function() {
                    if (currentHoverScope) {
                        changeScopeVariable(currentHoverScope, false, false);
                    }
                });
            };

            this.bindPlaylistDropEvents = function($element) {
                currentHoverScope = null;

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

            this.bindTrackDropEvents = function($element, scope) {
                $element.on('dragover', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    if (currentHoverScope !== scope) {
                        if (currentHoverScope) {
                            changeScopeVariable(currentHoverScope, false, false);
                        }

                        currentHoverScope = scope;
                    }

                    var dropAfter = ($element.height() < $event.originalEvent.offsetY * 2);
                    changeScopeVariable(scope, !dropAfter, dropAfter);
                });

                $element.on('drop', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    var addAfter = !currentHoverScope.dragoverPre;
                    changeScopeVariable(currentHoverScope, false, false);
                    getTracks().then(function(tracks) {
                        Playlist.addTracks(tracks, currentHoverScope.track, addAfter);
                    });
                });
            };
        }]);
