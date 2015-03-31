'use strict';

describe('Directive: playlistButton', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile,
        draggableDataService;

    beforeEach(function() {
        module('musicServerApp');
        module('musicServerApp.views');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');
            draggableDataService = $injector.get('draggableDataService');
            spyOn(draggableDataService, 'bindPlaylistDropEvents');

            element = angular.element(
                '<button playlist-button></button>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('initialisation', function() {
        it('should call draggableDataService.bindPlaylistDropEvents when loaded', function() {
            expect(draggableDataService.bindPlaylistDropEvents).toHaveBeenCalled();
            expect(draggableDataService.bindPlaylistDropEvents.calls.mostRecent().args[0][0]).toBe(element[0]);
        });
    });
});
