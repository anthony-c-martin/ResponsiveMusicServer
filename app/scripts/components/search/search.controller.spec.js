/* jshint -W117, -W030 */
describe('app.components.search.SearchController', function() {

    var controller;

    var artist1 = {ID: 32983, Name: 'Frank Zappa'};
    var album1 = {ID: 23982, Name: 'Apostrophe'};
    var track1 = {ID: 23980, Name: 'Uncle Remus'};

    beforeEach(module('app.components.search'));
    beforeEach(inject(function($controller, $rootScope, $q, ApiFactory) {
        window.$q = $q;
        window.$rootScope = $rootScope;
        window.ApiFactory = ApiFactory;
        window.$scope = $rootScope.$new();

        controller = $controller('SearchController', {
            $scope: $scope,
            $rootScope: $rootScope,
            $q: $q,
            ApiFactory: ApiFactory
        });
    }));

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
        spyOn(ApiFactory.artist, 'search').and.returnValue($q.when([artist1]));
        spyOn(ApiFactory.album, 'search').and.returnValue($q.when([album1]));
        spyOn(ApiFactory.track, 'search').and.returnValue($q.when([track1]));
        controller.searchText = 'oaiuOUIFabsu89y8t';
        controller.inProgress = false;

        controller.search();
        $rootScope.$digest();

        expect(ApiFactory.artist.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t', 0, 5);
        expect(ApiFactory.album.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t', 0, 5);
        expect(ApiFactory.track.search).toHaveBeenCalledWith('oaiuOUIFabsu89y8t', 0, 5);
        expect(controller.searchResults.artists).toEqual([artist1]);
        expect(controller.searchResults.albums).toEqual([album1]);
        expect(controller.searchResults.tracks).toEqual([track1]);
    });

    it('should cancel the search when  search is called and the backend artist search responds with a failure', function() {
        spyOn(ApiFactory.artist, 'search').and.returnValue($q.reject());
        spyOn(ApiFactory.album, 'search').and.returnValue($q.when([album1]));
        spyOn(ApiFactory.track, 'search').and.returnValue($q.when([track1]));
        controller.searchText = 'oaiuOUIFabsu89y8t';
        controller.inProgress = false;

        controller.search();
        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend album search responds with a failure', function() {
        spyOn(ApiFactory.artist, 'search').and.returnValue($q.when([artist1]));
        spyOn(ApiFactory.album, 'search').and.returnValue($q.reject());
        spyOn(ApiFactory.track, 'search').and.returnValue($q.when([track1]));
        controller.searchText = 'oaiuOUIFabsu89y8t';
        controller.inProgress = false;

        controller.search();
        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });

    it('should cancel the search when  search is called and the backend track search responds with a failure', function() {
        spyOn(ApiFactory.artist, 'search').and.returnValue($q.when([artist1]));
        spyOn(ApiFactory.album, 'search').and.returnValue($q.when([album1]));
        spyOn(ApiFactory.track, 'search').and.returnValue($q.reject());
        controller.searchText = 'oaiuOUIFabsu89y8t';
        controller.inProgress = false;

        controller.search();
        $rootScope.$digest();

        expect(controller.inProgress).toBeFalsy();
        expect(controller.searchShown).toBeFalsy();
    });
});
