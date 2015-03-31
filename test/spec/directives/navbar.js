'use strict';

describe('Directive: navbar', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile;

    angular.module('musicServerAppMocks', ['musicServerApp'])
        .controller('PlayerController', [
            function() {

            }])
        .controller('SearchController', [
            function() {

            }]);

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');

            element = angular.element(
                '<div navbar></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('initialisation', function() {
        /*it('should display properly', function() {

        });*/
    });
});
