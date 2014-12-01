'use strict';

describe('Directive: volumeControl', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile;

    beforeEach(function() {
        module('musicServerApp');
        module('musicServerApp.views');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');

            element = angular.element(
                '<volume-control></volume-control>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {
        it('should set the height property on the vol-bar div according to the current volume', function() {
            scope.volume = 0.75;
            scope.$digest();
            expect(element.find('.vol-bar').css('height')).toBe('75%');
            scope.volume = 0;
            scope.$digest();
            expect(element.find('.vol-bar').css('height')).toBe('0%');
        });

        it('should create a volumeChange function on the scope', function() {
            expect(scope.volumeChange).toBeDefined();
        });
    });
    describe('volumeChange', function() {
        it('should call the volumeChange function when the vol-container is clicked', function() {
            spyOn(scope, 'volumeChange');

            element.find('.vol-container').trigger('click');

            expect(scope.volumeChange).toHaveBeenCalled();
        });

        it('should update the setVolume property when the volumeChange function is called, based on the location of the click', function() {
            element.find('.vol-container').height('400px');
            var mockEvent = {
                currentTarget: element.find('.vol-container'),
                offsetY: 100
            };

            scope.volumeChange(mockEvent);

            expect(scope.setVolume).toBe(0.75);
        });
    });

    describe('hideDropdowns', function() {
        it('should set the volumeShown scope variable to false on the hideDropdowns event', function() {
            scope.volumeShown = true;

            $rootScope.$emit('hideDropdowns', 'asdf');

            expect(scope.volumeShown).toBeFalsy();
        });

        it('should not set the volumeShown scope variable to false on the hideDropdowns event with data set to "volume"', function() {
            scope.volumeShown = true;

            $rootScope.$emit('hideDropdowns', 'volume');

            expect(scope.volumeShown).toBeTruthy();
        });
    });
});
