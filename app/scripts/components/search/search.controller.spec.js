/* jshint -W117, -W030 */
describe('app.components.search.searchController', function() {

    var controller,
        apiFactory,
        $rootScope,
        $q;

    function mockApiSearchResponse(data, reject) {
        return {
            bound: function() { return this; },
            submit: function() { return reject ? $q.reject() : $q.when(data); }
        };
    }

    beforeEach(function() {
        module('app.components.search');

        inject(function($injector) {
            var $controller = $injector.get('$controller');

            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            apiFactory = $injector.get('apiFactory');

            controller = $controller('searchController', {
                $rootScope: $rootScope,
                apiFactory: apiFactory
            });
        });
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($rootScope, '$emit');

        controller.searchText = 'sf9ga8fd78G';
        controller.redirectToResults('artists');

        expect($rootScope.$emit.calls.count()).toBe(1);
        expect($rootScope.$emit).toHaveBeenCalledWith('changeLocation', '/music/search/artists/sf9ga8fd78G');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($rootScope, '$emit');

        controller.searchText = 'asdgsaldndsgjib';
        controller.redirectToResults('albums');

        expect($rootScope.$emit.calls.count()).toBe(1);
        expect($rootScope.$emit).toHaveBeenCalledWith('changeLocation', '/music/search/albums/asdgsaldndsgjib');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn($rootScope, '$emit');

        controller.searchText = 'asdgasgasege3r23';
        controller.redirectToResults('tracks');

        expect($rootScope.$emit.calls.count()).toBe(1);
        expect($rootScope.$emit).toHaveBeenCalledWith('changeLocation', '/music/search/tracks/asdgasgasege3r23');
    });

    it('should run a search and load the results into the scope when search is called', function() {
        var mockArtists = {};
        var mockAlbums = {};
        var mockTracks = {};

        spyOn(apiFactory.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockArtists, false);
        });
        spyOn(apiFactory.album, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockAlbums, false);
        });
        spyOn(apiFactory.track, 'search').and.callFake(function() {
            return mockApiSearchResponse(mockTracks, false);
        });

        controller.searchText = 'oaiuOUIFabsu89y8t';

        controller.inProgress = false;
        controller.search();

        expect(controller.inProgress).toBeTruthy();
        expect(controller.searchShown).toBeTruthy();

        expect(controller.searchResults.artists.length).toBe(0);
        expect(controller.searchResults.albums.length).toBe(0);
        expect(controller.searchResults.tracks.length).toBe(0);

        expect(apiFactory.artist.search.calls.count()).toBe(1);
        expect(apiFactory.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(apiFactory.album.search.calls.count()).toBe(1);
        expect(apiFactory.album.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');
        expect(apiFactory.track.search.calls.count()).toBe(1);
        expect(apiFactory.track.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeTruthy();
        expect(controller.searchResults.artists).toBe(mockArtists);
        expect(controller.searchResults.albums).toBe(mockAlbums);
        expect(controller.searchResults.tracks).toBe(mockTracks);
    });

    it('should cancel the search when  search is called and the backend artist search responds with a failure', function() {
        spyOn(apiFactory.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(apiFactory.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(apiFactory.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        controller.searchText = 'oaiuOUIFabsu89y8t';

        controller.inProgress = false;
        controller.search();

        expect(controller.inProgress).toBeTruthy();
        expect(controller.searchShown).toBeTruthy();

        expect(controller.searchResults.artists.length).toBe(0);
        expect(controller.searchResults.albums.length).toBe(0);
        expect(controller.searchResults.tracks.length).toBe(0);

        expect(apiFactory.artist.search.calls.count()).toBe(1);
        expect(apiFactory.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend album search responds with a failure', function() {
        spyOn(apiFactory.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(apiFactory.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        spyOn(apiFactory.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        controller.searchText = 'oaiuOUIFabsu89y8t';

        controller.inProgress = false;
        controller.search();

        expect(controller.inProgress).toBeTruthy();
        expect(controller.searchShown).toBeTruthy();

        expect(controller.searchResults.artists.length).toBe(0);
        expect(controller.searchResults.albums.length).toBe(0);
        expect(controller.searchResults.tracks.length).toBe(0);

        expect(apiFactory.artist.search.calls.count()).toBe(1);
        expect(apiFactory.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend track search responds with a failure', function() {
        spyOn(apiFactory.artist, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(apiFactory.album, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, false);
        });
        spyOn(apiFactory.track, 'search').and.callFake(function() {
            return mockApiSearchResponse({}, true);
        });
        controller.searchText = 'oaiuOUIFabsu89y8t';

        controller.inProgress = false;
        controller.search();

        expect(controller.inProgress).toBeTruthy();
        expect(controller.searchShown).toBeTruthy();

        expect(controller.searchResults.artists.length).toBe(0);
        expect(controller.searchResults.albums.length).toBe(0);
        expect(controller.searchResults.tracks.length).toBe(0);

        expect(apiFactory.artist.search.calls.count()).toBe(1);
        expect(apiFactory.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t');

        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });
});
