'use strict';

describe('Controller: SearchController', function() {

    function mockApiSearchResponse(data, reject) {
        return {
            bound: function() { return this; },
            submit: function() { return reject ? $q.reject() : $q.when(data); }
        };
    }

    beforeEach(module('musicServerApp'));

    var SearchController,
        $scope, ApiRequest, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _ApiRequest_) {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        ApiRequest = _ApiRequest_;

        SearchController = $controller('SearchController', {
            $scope: $scope,
            ApiRequest: _ApiRequest_
        });
    }));

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($scope, '$emit');

        $scope.searchText = 'sf9ga8fd78G';
        $scope.redirectToResults('artists');

        expect($scope.$emit.callCount).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/artists/s/sf9ga8fd78G');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($scope, '$emit');

        $scope.searchText = 'asdgsaldndsgjib';
        $scope.redirectToResults('albums');

        expect($scope.$emit.callCount).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/albums/s/asdgsaldndsgjib');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($scope, '$emit');

        $scope.searchText = 'asdgasgasege3r23';
        $scope.redirectToResults('tracks');

        expect($scope.$emit.callCount).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/tracks/s/asdgasgasege3r23');
    });

    it('should run a search and load the results into the scope when search is called', function() {
        var mockArtists = {};
        var mockAlbums = {};
        var mockTracks = {};

        spyOn(ApiRequest.artist, 'search').andCallFake(function() {
            return mockApiSearchResponse(mockArtists, false);
        });
        spyOn(ApiRequest.album, 'search').andCallFake(function() {
            return mockApiSearchResponse(mockAlbums, false);
        });
        spyOn(ApiRequest.track, 'search').andCallFake(function() {
            return mockApiSearchResponse(mockTracks, false);
        });

        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.search();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.searchResults.artists.length).toBe(0);
        expect($scope.searchResults.albums.length).toBe(0);
        expect($scope.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.callCount).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(ApiRequest.album.search.callCount).toBe(1);
        expect(ApiRequest.album.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(ApiRequest.track.search.callCount).toBe(1);
        expect(ApiRequest.track.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeTruthy();
        expect($scope.searchResults.artists).toBe(mockArtists);
        expect($scope.searchResults.albums).toBe(mockAlbums);
        expect($scope.searchResults.tracks).toBe(mockTracks);
    });

    it('should cancel the search when  search is called and the backend artist search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(ApiRequest.album, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.track, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.search();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.searchResults.artists.length).toBe(0);
        expect($scope.searchResults.albums.length).toBe(0);
        expect($scope.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.callCount).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend album search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.album, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(ApiRequest.track, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.search();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.searchResults.artists.length).toBe(0);
        expect($scope.searchResults.albums.length).toBe(0);
        expect($scope.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.callCount).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend track search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.album, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.track, 'search').andCallFake(function() {
            return mockApiSearchResponse({}, true);
        });
        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.search();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.searchResults.artists.length).toBe(0);
        expect($scope.searchResults.albums.length).toBe(0);
        expect($scope.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.callCount).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeFalsy();
    });
});
