'use strict';

angular.module('musicServerApp')
    .directive('albumList', ['$compile',
        function ($compile) {
            return {
                restrict: 'A',
                controller: 'AlbumListController',
                link: function (scope) {
                    var albumTrackListScope;
                    var selectedAlbum;

                    scope.showDesc = function(album) {
                        var sameAlbum = (album === selectedAlbum);
                        scope.closeDesc();
                        if (!sameAlbum) {
                            selectedAlbum = album;
                            albumTrackListScope = scope.$new();
                            albumTrackListScope.selected = selectedAlbum;
                            $compile('<album-track-list album="selected"></album-track-list>')(albumTrackListScope);
                        }
                    };

                    scope.closeDesc = function() {
                        if (albumTrackListScope) {
                            albumTrackListScope.$destroy();
                        }
                        selectedAlbum = null;
                    };
                }
            };
        }]);
