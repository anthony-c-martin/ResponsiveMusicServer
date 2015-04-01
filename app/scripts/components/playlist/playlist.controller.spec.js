/* jshint -W117, -W030 */
describe('app.components.playlist.PlaylistController', function() {

    var controller,
        selectableTracksFactory,
        playerService,
        $scope,
        $rootScope,
        $q;

    var mockselectableTracksFactory = {
        removeSelection: function() {}
    };

    beforeEach(function() {
        module('app.components.playlist');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            selectableTracksFactory = jasmine.createSpy('selectableTracksFactorySpy').and.returnValue(mockselectableTracksFactory);
            playerService = {
                playlist: jasmine.createSpyObj('playlist', ['removeTrack', 'clear'])
            };

            var $controller = $injector.get('$controller');

            controller = $controller('PlaylistController', {
                $scope: $scope,
                playerService: playerService,
                selectableTracksFactory: selectableTracksFactory
            });
        });
    });

    describe('initialisation', function() {
        it('should create a new selectableTracksFactory object and set the allTracks array to the playlist tracks', function() {
            expect(selectableTracksFactory).toHaveBeenCalledWith();
            expect(selectableTracksFactory.calls.count()).toBe(1);

            expect($scope.trackArea).toBe(mockselectableTracksFactory);
            expect($scope.trackArea.allTracks).toBe(controller.playlist);
        });
    });

    describe('removeTrack', function() {
        it('should call removeTrack on the playlist object', function() {
            var mockTrack = {};

            controller.removeTrack(mockTrack);

            expect(playerService.playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
            expect(playerService.playlist.removeTrack.calls.count()).toBe(1);
        });
    });

    describe('removeAll', function() {
        it('should call clear on the playlist object', function() {
            controller.removeAll();

            expect(playerService.playlist.clear).toHaveBeenCalledWith();
            expect(playerService.playlist.clear.calls.count()).toBe(1);
        });
    });

    describe('removeSelection', function() {
        it('should call removeSelection on the selectableTracksFactory object', function() {
            spyOn($scope.trackArea, 'removeSelection');

            controller.removeSelection();

            expect($scope.trackArea.removeSelection).toHaveBeenCalledWith();
            expect($scope.trackArea.removeSelection.calls.count()).toBe(1);
        });
    });

});
