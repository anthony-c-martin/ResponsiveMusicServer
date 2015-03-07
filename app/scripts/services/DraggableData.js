'use strict';

angular.module('musicServerApp')
    .service('DraggableData', ['$q', 'ApiRequest', 'PlayerService',
        function($q, ApiRequest, PlayerService) {
            var service = this;

            var playlist = PlayerService.playlist;
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
                var promises = [];
                angular.forEach(artists, function(artist) {
                    promises.push(ApiRequest.track.getFromArtist(artist.ID).bound(0, 1000).submit());
                });

                currentDeferred = $q.defer();
                $q.all(promises).then(function(data) {
                    var trackList = [];
                    for (var i = 0; i < data.length; i++) {
                        trackList = trackList.concat(data[i]);
                    }
                    currentDeferred.resolve(trackList);
                }, function() {
                    currentDeferred.reject();
                });
            }

            function setAlbums(albums) {
                var promises = [];
                angular.forEach(albums, function(album) {
                    promises.push(ApiRequest.track.getFromAlbum(album.ID).bound(0, 1000).submit());
                });

                currentDeferred = $q.defer();
                $q.all(promises).then(function(data) {
                    var trackList = [];
                    for (var i = 0; i < data.length; i++) {
                        trackList = trackList.concat(data[i]);
                    }
                    currentDeferred.resolve(trackList);
                }, function() {
                    currentDeferred.reject();
                });
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

            function bindDragEvents($element, item, itemType, itemListFunction, itemSelectedFunction) {
                $element.on('dragstart', function($event) {
                    if (!itemSelectedFunction()) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        return;
                    }

                    var itemList = itemListFunction();
                    if (service.getDragElement) {
                        $event.dataTransfer.setDragImage(service.getDragElement(itemList.length, itemType), -10, -10);
                    }

                    switch (itemType) {
                        case 'Track':
                            service.setTracks(itemList);
                            break;
                        case 'Artist':
                            service.setArtists(itemList);
                            break;
                        case 'Album':
                            service.setAlbums(itemList);
                            break;
                    }
                });

                $element.on('dragend', function() {
                    if (service.currentHoverScope) {
                        changeScopeVariable(service.currentHoverScope, false, false);
                    }
                });
            }

            function bindPlaylistDropEvents($element) {
                service.currentHoverScope = null;

                $element.on('dragover', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                });

                $element.on('drop', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    getTracks().then(function(tracks) {
                        playlist.addTracks(tracks);
                    });
                    playlist.deselectAll();
                });
            }

            function bindTrackDropEvents($element, scope) {
                $element.on('dragover', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    if (service.currentHoverScope !== scope) {
                        if (service.currentHoverScope) {
                            changeScopeVariable(service.currentHoverScope, false, false);
                        }

                        service.currentHoverScope = scope;
                    }

                    var dropAfter = ($element[0].clientHeight < $event.offsetY * 2);
                    changeScopeVariable(scope, !dropAfter, dropAfter);
                });

                $element.on('drop', function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    var addAfter = !service.currentHoverScope.dragoverPre;
                    changeScopeVariable(service.currentHoverScope, false, false);
                    getTracks().then(function(tracks) {
                        playlist.addTracks(tracks, service.currentHoverScope.track, addAfter);
                    });
                });
            }


            angular.extend(this, {
                getDragElement: null,
                currentHoverScope: null,
                bindTrackDropEvents: bindTrackDropEvents,
                bindPlaylistDropEvents: bindPlaylistDropEvents,
                bindDragEvents: bindDragEvents,
                getTracks: getTracks,
                setAlbums: setAlbums,
                setArtists: setArtists,
                setTracks: setTracks
            });
        }]);
