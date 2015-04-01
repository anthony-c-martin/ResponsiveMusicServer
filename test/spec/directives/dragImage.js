'use strict';

describe('Directive: dragImage', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile,
        draggableDataService;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');
            draggableDataService = $injector.get('draggableDataService');

            draggableDataService.getDragElement = null;
            element = angular.element(
                '<div drag-image></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('initialisation', function() {
        it('should set draggableDataService.getDragElement', function() {
            expect(draggableDataService.getDragElement).toBeDefined();
        });
    });

    describe('getDragElenent', function() {
        it('should correctly set the text on the element when getDragElement is called with count = 1', function() {
            draggableDataService.getDragElement(1, 'asdga9su9');

            expect(element.text()).toBe('1 asdga9su9');
        });

        it('should correctly set the text on the element when getDragElement is called with count > 1', function() {
            draggableDataService.getDragElement(5, 'asdf97asfg87');

            expect(element.text()).toBe('5 asdf97asfg87s');
        });

        it('should return a reference to the DOM element when getDragElement is called', function() {
            expect(draggableDataService.getDragElement(9, 'asdg89hasf98h')).toBe(element[0]);
        });
    });
});
