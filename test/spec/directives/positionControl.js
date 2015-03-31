'use strict';

describe('Directive: positionControl', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $compile;

    beforeEach(function() {
        module('musicServerApp');

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
            var mockEvent = {
                currentTarget: {
                    clientWidth: 400
                },
                offsetX: 100
            };

            scope.positionChange(mockEvent);

            expect($parentScope.randomFunction).toHaveBeenCalledWith(0.25);
        });
    });
});
