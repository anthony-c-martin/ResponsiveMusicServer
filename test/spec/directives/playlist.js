'use strict';

describe('Directive: playlist', function() {

    var element,
        controller,
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
                '<playlist></playlist>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            controller = element.controller('playlist');
            scope = element.scope();
        });
    });

    describe('initialisation', function() {

    });

    describe('hideDropdowns', function() {
        it('should set the playlistShown scope variable to false on the hideDropdowns event', function() {
            scope.playlistShown = true;

            $rootScope.$emit('hideDropdowns', 'asdfdugi');

            expect(scope.playlistShown).toBeFalsy();
        });

        it('should not set the playlistShown scope variable to false on the hideDropdowns event with data set to "playlist"', function() {
            scope.playlistShown = true;

            $rootScope.$emit('hideDropdowns', 'playlist');

            expect(scope.playlistShown).toBeTruthy();
        });
    });

    describe('display', function() {
        beforeEach(function() {
            controller.playlist.push({
                ID: 18726,
                Name: 'asdf87gas8'
            }, {
                ID: 12355,
                Name: 'as8fd7g8s7afgiu'
            });
            scope.$digest();
        });

        it('should only show a message "This playlist is empty!" if there are no tracks', function() {
            controller.playlist.length = 0;
            scope.$digest();

            expect(element.find('ul.playlist.tracks').children().length).toBe(1);
            expect(element.find('ul.playlist.tracks>li').text()).toBe('This playlist is empty!');
        });

        it('should display remove buttons if the playlist is not empty', function() {
            expect(element.find('ul.playlist.tracks').children().length).toBe(3);
            expect(element.find('ul.playlist.tracks').find('.link-left').text()).toBe('Clear All');
            expect(element.find('ul.playlist.tracks').find('.link-right').text()).toBe('Clear Selected');
        });

        it('should call removeAll on the PlaylistController when the Clear All button is pressed', function() {
            spyOn(controller, 'removeAll');

            element.find('ul.playlist.tracks').find('.link-left').trigger('click');

            expect(controller.removeAll).toHaveBeenCalledWith();
        });

        it('should call removeSelection on the PlaylistController when the Clear Selected button is pressed', function() {
            spyOn(controller, 'removeSelection');

            element.find('ul.playlist.tracks').find('.link-right').trigger('click');

            expect(controller.removeSelection).toHaveBeenCalledWith();
        });

        it('should contain track elements for each track', function() {
            var liTrack1 = angular.element(element.find('ul.playlist.tracks').children()[1]);
            var liTrack2 = angular.element(element.find('ul.playlist.tracks').children()[2]);

            expect (liTrack1.find('.desc').text()).toBe('asdf87gas8');
            expect (liTrack2.find('.desc').text()).toBe('as8fd7g8s7afgiu');
        });
    });
});
