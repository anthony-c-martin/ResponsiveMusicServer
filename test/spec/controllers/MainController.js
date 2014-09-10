'use strict';

describe('Controller: MainController', function() {

    beforeEach(module('musicServerApp'));

    var MainController,
        $scope, $rootScope, DataLoader, Playlist, HttpRequest, $q;

    beforeEach(inject(function($controller, _$rootScope_, _DataLoader_, _Playlist_, _HttpRequest_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        DataLoader = _DataLoader_;
        Playlist = _Playlist_;
        HttpRequest = _HttpRequest_;
        $q = _$q_;

        MainController = $controller('MainController', {
            $rootScope: $rootScope,
            $scope: $scope,
            DataLoader: _DataLoader_,
            Playlist: _Playlist_,
            HttpRequest: _HttpRequest_
        });
    }));

    it('should initialise artists, albums and tracks on start', function() {
        expect($scope.artists).toEqual([]);
        expect($scope.albums).toEqual([]);
        expect($scope.tracks).toEqual([]);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockArtist = {
            ID: 28764
        };
        spyOn(Playlist, 'addTracksByArtist');

        $rootScope.$emit('addArtist', mockArtist);

        expect(Playlist.addTracksByArtist).toHaveBeenCalledWith(28764);
        expect(Playlist.addTracksByArtist.callCount).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockArtist = {
            ID: 12525
        };
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracksByArtist').andCallFake(function() {
            return $q.when();
        });
        spyOn($scope, '$emit');

        $rootScope.$emit('playArtist', mockArtist);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);
        expect(Playlist.addTracksByArtist).toHaveBeenCalledWith(12525);
        expect(Playlist.addTracksByArtist.callCount).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockAlbum = {
            ID: 23166
        };
        spyOn(Playlist, 'addTracksByAlbum');

        $rootScope.$emit('addAlbum', mockAlbum);

        expect(Playlist.addTracksByAlbum).toHaveBeenCalledWith(23166);
        expect(Playlist.addTracksByAlbum.callCount).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockAlbum = {
            ID: 43764
        };
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracksByAlbum').andCallFake(function() {
            return $q.when();
        });
        spyOn($scope, '$emit');

        $rootScope.$emit('playAlbum', mockAlbum);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);
        expect(Playlist.addTracksByAlbum).toHaveBeenCalledWith(43764);
        expect(Playlist.addTracksByAlbum.callCount).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });

    it('should add a track to the playlist on the addTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'addTracks');

        $rootScope.$emit('addTrack', mockTrack);

        expect(Playlist.addTracks).toHaveBeenCalled();
        expect(Playlist.addTracks.callCount).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0].length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);
    });

    it('should remove a track from the playlist on the removeTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'removeTrack');

        $rootScope.$emit('removeTrack', mockTrack);

        expect(Playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
        expect(Playlist.removeTrack.callCount).toBe(1);
    });

    it('should clear the playlist, add a track to it, and then emit a StartPlaying event on the playTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracks');
        spyOn($scope, '$emit');

        $rootScope.$emit('playTrack', mockTrack);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);

        expect(Playlist.addTracks).toHaveBeenCalled();
        expect(Playlist.addTracks.callCount).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0].length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });
});

/*
'use strict';

angular.module('musicServerApp')
    .controller('MainController', ['$scope', '$rootScope', 'DataLoader', 'Playlist', 'HttpRequest',
        function($scope, $rootScope, DataLoader, Playlist, HttpRequest) {
            function loadArtists() {
                $scope.artists.length = 0;
                $scope.artistRequest = DataLoader.init(HttpRequest.artist.getAll(), $scope.artists);
            }

            function loadAlbums(artist) {
                $scope.albums.length = 0;
                if (artist) {
                    $scope.albumRequest = DataLoader.init(HttpRequest.album.getFromArtist(artist.ID), $scope.albums);
                } else {
                    $scope.albumRequest = {
                        fetch: function() { }
                    };
                }
            }

            function loadTracks(album) {
                $scope.tracks.length = 0;
                if (album) {
                    $scope.trackRequest = DataLoader.init(HttpRequest.track.getFromAlbum(album.ID), $scope.tracks);
                } else {
                    $scope.trackRequest = {
                        fetch: function() { }
                    };
                }
            }

            $rootScope.$on('selectArtist', function(e, artist) {
                loadAlbums(artist);
                loadTracks(null);
                $scope.albumRequest.fetch();
            });

            $rootScope.$on('selectAlbum', function(e, album) {
                loadTracks(album);
                $scope.trackRequest.fetch();
            });

            loadArtists();
        }
    ]);

*/
