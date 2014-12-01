'use strict';

describe('Directive: scrollLoader', function() {

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
                '<div scroll-loader="testFunction()"></div>'
            );
            $parentScope.testFunction = jasmine.createSpy('testFunction');

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {
        it('should call the scope function on start', function() {
            expect(scope.testFunction).toHaveBeenCalledWith();
        });
    });

    describe('scroll', function() {
        it('should call the scope function on scroll if close to the bottom of the container', function() {
            scope.testFunction.reset();

            element.trigger('scroll');

            expect(scope.testFunction).toHaveBeenCalledWith();
        });
    });
});
