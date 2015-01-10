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

        SearchController.searchText = 'sf9ga8fd78G';
        SearchController.redirectToResults('artists');

        expect($scope.$emit.calls.count()).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/artists/s/sf9ga8fd78G');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($scope, '$emit');

        SearchController.searchText = 'asdgsaldndsgjib';
        SearchController.redirectToResults('albums');

        expect($scope.$emit.calls.count()).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/albums/s/asdgsaldndsgjib');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($scope, '$emit');

        SearchController.searchText = 'asdgasgasege3r23';
        SearchController.redirectToResults('tracks');

        expect($scope.$emit.calls.count()).toBe(1);
        expect($scope.$emit).toHaveBeenCalledWith('changeLocation', '/tracks/s/asdgasgasege3r23');
    });

    it('should run a search and load the results into the scope when search is called', function() {
        var mockArtists = {};
        var mockAlbums = {};
        var mockTracks = {};

        spyOn(ApiRequest.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockArtists, false);
        });
        spyOn(ApiRequest.album, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockAlbums, false);
        });
        spyOn(ApiRequest.track, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockTracks, false);
        });

        SearchController.searchText = 'oaiuOUIFabsu89y8t';

        SearchController.inProgress = false;
        SearchController.search();

        expect(SearchController.inProgress).toBeTruthy();
        expect(SearchController.searchShown).toBeTruthy();

        expect(SearchController.searchResults.artists.length).toBe(0);
        expect(SearchController.searchResults.albums.length).toBe(0);
        expect(SearchController.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.calls.count()).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(ApiRequest.album.search.calls.count()).toBe(1);
        expect(ApiRequest.album.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(ApiRequest.track.search.calls.count()).toBe(1);
        expect(ApiRequest.track.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect(SearchController.inProgress).toBeFalsy();
        expect(SearchController.searchShown).toBeTruthy();
        expect(SearchController.searchResults.artists).toBe(mockArtists);
        expect(SearchController.searchResults.albums).toBe(mockAlbums);
        expect(SearchController.searchResults.tracks).toBe(mockTracks);
    });

    it('should cancel the search when  search is called and the backend artist search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(ApiRequest.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        SearchController.searchText = 'oaiuOUIFabsu89y8t';

        SearchController.inProgress = false;
        SearchController.search();

        expect(SearchController.inProgress).toBeTruthy();
        expect(SearchController.searchShown).toBeTruthy();

        expect(SearchController.searchResults.artists.length).toBe(0);
        expect(SearchController.searchResults.albums.length).toBe(0);
        expect(SearchController.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.calls.count()).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect(SearchController.inProgress).toBeFalsy();
        expect(SearchController.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend album search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(ApiRequest.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        SearchController.searchText = 'oaiuOUIFabsu89y8t';

        SearchController.inProgress = false;
        SearchController.search();

        expect(SearchController.inProgress).toBeTruthy();
        expect(SearchController.searchShown).toBeTruthy();

        expect(SearchController.searchResults.artists.length).toBe(0);
        expect(SearchController.searchResults.albums.length).toBe(0);
        expect(SearchController.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.calls.count()).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect(SearchController.inProgress).toBeFalsy();
        expect(SearchController.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend track search responds with a failure', function() {
        spyOn(ApiRequest.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(ApiRequest.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        SearchController.searchText = 'oaiuOUIFabsu89y8t';

        SearchController.inProgress = false;
        SearchController.search();

        expect(SearchController.inProgress).toBeTruthy();
        expect(SearchController.searchShown).toBeTruthy();

        expect(SearchController.searchResults.artists.length).toBe(0);
        expect(SearchController.searchResults.albums.length).toBe(0);
        expect(SearchController.searchResults.tracks.length).toBe(0);

        expect(ApiRequest.artist.search.calls.count()).toBe(1);
        expect(ApiRequest.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect(SearchController.inProgress).toBeFalsy();
        expect(SearchController.searchShown).toBeFalsy();
    });
});
