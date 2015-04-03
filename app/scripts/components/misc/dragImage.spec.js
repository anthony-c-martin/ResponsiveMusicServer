/* jshint -W117, -W030 */
describe('app.components.misc.amDragImage', function() {

    var element,
        scope;

    beforeEach(module('app.components.misc'));

    beforeEach(inject(function($compile, draggableDataService, $rootScope) {
        window.draggableDataService = draggableDataService;

        element = angular.element(
            '<div am-drag-image></div>'
        );

        $compile(element)($rootScope);
        $rootScope.$digest();

        scope = element.scope();
    }));

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
