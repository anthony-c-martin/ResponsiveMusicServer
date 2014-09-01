'use strict';

angular.module('musicServerApp')
    .directive('playlistEntry', ['DraggableData', 'Playlist',
    function(DraggableData, Playlist) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('dragover', function(e) {
                    if (!scope.track.selected) {
                        var placeHolderIndex = scope.placeholder.index();
                        var addAfter = (element.height() < e.originalEvent.offsetY * 2);
                        if (addAfter && element.index() > placeHolderIndex) {
                            element.after(scope.placeholder);
                        }
                        else if (!addAfter && (element.index() < placeHolderIndex || placeHolderIndex < 0)) {
                            element.before(scope.placeholder);
                        }
                        if (placeHolderIndex !== scope.placeholder.index()) {
                            scope.placeholder.unbind('drop').on('drop', function() {
                                dropHandler(addAfter);
                            });
                        }
                    }
                    else {
                        scope.placeholder.remove();
                    }
                });
                element.on('drop', function(e) {
                    dropHandler(element.height() < e.originalEvent.offsetY * 2);
                });

                function dropHandler(addAfter) {
                    scope.placeholder.remove();
                    if (!scope.track.selected) {
                        Playlist.deselectAll();
                        DraggableData.getTracks().then(function(tracks) {
                            Playlist.removeTracks(tracks);
                            Playlist.addTracks(tracks, scope.track, addAfter);
                        });
                    }
                }
            }
        };
    }]);
