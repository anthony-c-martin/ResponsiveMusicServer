'use strict';

describe('Controller: ArtistController', function() {

    var controller,
        $scope,
        $rootScope,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('ArtistController', {
                $scope: $scope
            });
        });
    });

    describe('add', function() {
        it('should emit an addArtist event and stop event propagation', function() {
            spyOn($scope, '$emit');
            var mockArtist = {};
            controller.artist = mockArtist;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.add(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('addArtist', mockArtist);
            expect($scope.$emit.callCount).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('play', function() {
        it('should emit a playArtist event and stop event propagation', function() {
            spyOn($scope, '$emit');
            var mockArtist = {};
            controller.artist = mockArtist;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.play(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('playArtist', mockArtist);
            expect($scope.$emit.callCount).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();

        });
    });

    describe('select', function() {
        it('should emit a selectArtist event', function() {
            spyOn($scope, '$emit');
            var mockArtist = {};
            controller.artist = mockArtist;

            controller.select();

            expect($scope.$emit).toHaveBeenCalledWith('selectArtist', mockArtist);
            expect($scope.$emit.callCount).toBe(1);
        });
    });
});
