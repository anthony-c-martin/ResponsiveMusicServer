'use strict';

describe('Directive: playlistButton', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile,
        DraggableData;

    beforeEach(function() {
        module('musicServerApp');
        module('musicServerApp.views');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');
            DraggableData = $injector.get('DraggableData');
            spyOn(DraggableData, 'bindPlaylistDropEvents');

            element = angular.element(
                '<button playlist-button></button>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {
        it('should call DraggableData.bindPlaylistDropEvents when loaded', function() {
            expect(DraggableData.bindPlaylistDropEvents).toHaveBeenCalled();
            expect(DraggableData.bindPlaylistDropEvents.mostRecentCall.args[0][0]).toBe(element[0]);
        });
    });
});
