'use strict';

describe('Directive: bodyEventHandler', function() {

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
                '<div body-event-handler="asdf98h98hiusfh"></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {

    });

    describe('click - attribute set', function() {
        it('should emit a hideDropdowns event with the bodyEventHandler attribute text as the data', function() {
            spyOn($rootScope, '$emit');

            element.trigger('click');

            expect($rootScope.$emit).toHaveBeenCalledWith('hideDropdowns', 'asdf98h98hiusfh');
        });
    });

    describe('click - no attribute set', function() {
        beforeEach(function() {
            element = angular.element(
                '<div body-event-handler></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });

        it('should emit a hideDropdowns event with no data set', function() {
            spyOn($rootScope, '$emit');

            element.trigger('click');

            expect($rootScope.$emit).toHaveBeenCalledWith('hideDropdowns');
        });
    });
});
