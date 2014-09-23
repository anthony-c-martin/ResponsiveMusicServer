'use strict';

describe('Directive: dragImage', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile,
        DraggableData;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');
            DraggableData = $injector.get('DraggableData');

            DraggableData.getDragElement = null;
            element = angular.element(
                '<div drag-image></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {
        it('should set DraggableData.getDragElement', function() {
            expect(DraggableData.getDragElement).toBeDefined();
        });
    });

    describe('getDragElenent', function() {
        it('should correctly set the text on the element when getDragElement is called with count = 1', function() {
            DraggableData.getDragElement(1, 'asdga9su9');

            expect(element.text()).toBe('1 asdga9su9');
        });

        it('should correctly set the text on the element when getDragElement is called with count > 1', function() {
            DraggableData.getDragElement(5, 'asdf97asfg87');

            expect(element.text()).toBe('5 asdf97asfg87s');
        });

        it('should return a reference to the DOM element when getDragElement is called', function() {
            expect(DraggableData.getDragElement(9, 'asdg89hasf98h')).toBe(element[0]);
        });
    });
});
