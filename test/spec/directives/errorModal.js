'use strict';

describe('Directive: errorModal', function() {

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
                '<error-modal></error-modal>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.isolateScope();
        });
    });

    describe('Initialisation', function() {
        it('should be hidden if there is no error message', function() {
            scope.errorMessage = '';
            scope.$digest();

            expect(element.find('.error-modal').is(':visible')).toBeFalsy();
        });

        it('should display the error message if there is one set', function() {
            scope.errorMessage = 's9a7dfg8sdifu';
            scope.$digest();

            expect(element.find('.error-modal').text()).toBe('s9a7dfg8sdifu');
        });
    });
});
