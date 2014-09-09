'use strict';

describe('Controller: SearchController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var SearchController,
        $scope, HttpRequest, $q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$rootScope_, _$q_, _HttpRequest_) {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        HttpRequest = _HttpRequest_;

        SearchController = $controller('SearchController', {
            $scope: $scope,
            HttpRequest: _HttpRequest_
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

    it('should run a search and load the results into the scope when initSearch is called', function() {
        var mockArtists = {};
        var mockAlbums = {};
        var mockTracks = {};

        spyOn(HttpRequest.search, 'all').andCallFake(function() {
            return $q.when({
                artists: mockArtists,
                albums: mockAlbums,
                tracks: mockTracks
            });
        });
        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.initSearch();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.search.artists.length).toBe(0);
        expect($scope.search.albums.length).toBe(0);
        expect($scope.search.tracks.length).toBe(0);

        expect(HttpRequest.search.all.callCount).toBe(1);
        expect(HttpRequest.search.all).toHaveBeenCalledWith(5, 'oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeTruthy();
        expect($scope.search.artists).toBe(mockArtists);
        expect($scope.search.albums).toBe(mockAlbums);
        expect($scope.search.tracks).toBe(mockTracks);
    });

    it('should cancel the search when  initSearch is called and the backend responds with a failure', function() {
        spyOn(HttpRequest.search, 'all').andCallFake(function() {
            return $q.reject();
        });
        $scope.searchText = 'oaiuOUIFabsu89y8t';

        $scope.searchInProgress = false;
        $scope.initSearch();

        expect($scope.searchInProgress).toBeTruthy();
        expect($scope.searchShown).toBeTruthy();

        expect($scope.search.artists.length).toBe(0);
        expect($scope.search.albums.length).toBe(0);
        expect($scope.search.tracks.length).toBe(0);

        expect(HttpRequest.search.all.callCount).toBe(1);
        expect(HttpRequest.search.all).toHaveBeenCalledWith(5, 'oaiuOUIFabsu89y8t');

        $scope.$digest();

        expect($scope.searchInProgress).toBeFalsy();
        expect($scope.searchShown).toBeFalsy();
    });
});
