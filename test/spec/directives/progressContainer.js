'use strict';

describe('Directive: progressContainer', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');

            element = angular.element(
                '<div progress-container></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('positionChange', function() {
        it('should emit a SetPosition event when the positionChange function is called, based on the location of the click', function() {
            spyOn(scope, '$emit');
            element.width('400px');
            var mockEvent = {
                clientX: 100
            };

            scope.positionChange(mockEvent);

            expect(scope.$emit).toHaveBeenCalledWith('SetPosition', 0.25);
        });
    });
});
