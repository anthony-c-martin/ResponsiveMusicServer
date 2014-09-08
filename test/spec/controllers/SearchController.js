'use strict';

describe('Controller: SearchController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var SearchController,
        rootScope, scope, mockHttpRequest;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, HttpRequest) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockHttpRequest = HttpRequest;

        SearchController = $controller('SearchController', {
            $scope: scope,
            HttpRequest: HttpRequest
        });
    }));

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn(scope, '$emit');

        scope.searchText = 'sf9ga8fd78G';
        scope.redirectToResults('artists');

        expect(scope.$emit.callCount).toBe(1);
        expect(scope.$emit).toHaveBeenCalledWith('changeLocation', '/artists/s/sf9ga8fd78G');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn(scope, '$emit');

        scope.searchText = 'asdgsaldndsgjib';
        scope.redirectToResults('albums');

        expect(scope.$emit.callCount).toBe(1);
        expect(scope.$emit).toHaveBeenCalledWith('changeLocation', '/albums/s/asdgsaldndsgjib');
    });

    it('should emit a changeLocation event when the redirectToResults function is called', function() {
        spyOn(scope, '$emit');

        scope.searchText = 'asdgasgasege3r23';
        scope.redirectToResults('tracks');

        expect(scope.$emit.callCount).toBe(1);
        expect(scope.$emit).toHaveBeenCalledWith('changeLocation', '/tracks/s/asdgasgasege3r23');
    });

    it('should run a search and load the results into the scope when initSearch is called', function() {
        scope.searchInProgress = false;
        scope.initSearch();

        expect(scope.searchInProgress).ToBeTruthy();
    });
});
/*
'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$scope', 'HttpRequest',
        function ($scope, HttpRequest) {
            $scope.initSearch = function() {
                $scope.searchInProgress = true;
                $scope.search = {
                    artists: [],
                    albums: [],
                    tracks: []
                };

                $scope.searchShown = true;

                HttpRequest.search.all(5, $scope.searchText).then(function(results) {
                    $scope.search.artists = results.artists;
                    $scope.search.albums = results.albums;
                    $scope.search.tracks = results.tracks;
                    $scope.searchInProgress = false;
                });
            };

            $scope.redirectToResults = function(type) {
                var redirect = '/' + type + '/s/' + encodeURIComponent($scope.searchText);
                $scope.$emit('changeLocation', redirect);
            };
        }]);
*/
