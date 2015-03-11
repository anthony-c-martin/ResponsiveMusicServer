'use strict';

describe('Directive: positionControl', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $compile;

    beforeEach(function() {
        module('musicServerApp');
        module('musicServerApp.views');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $parentScope.randomFunction = jasmine.createSpy('randomFunction');
            $compile = $injector.get('$compile');

            element = angular.element(
                '<position-control position-update="randomFunction"></position-control>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.isolateScope();
        });
    });

    describe('positionChange', function() {
        it('should call the scope positionUpdate function with the correct position', function() {
            var progContainer = element.find('.prog-container');

            progContainer.width('400px');
            var mockEvent = {
                currentTarget: progContainer,
                offsetX: 100
            };

            scope.positionChange(mockEvent);

            expect($parentScope.randomFunction).toHaveBeenCalledWith(0.25);
        });
    });
});
