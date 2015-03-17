'use strict';

describe('Directive: track', function() {

    var element,
        playlistElement,
        controller,
        playlistController,
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
                '<li track="track"></li>'
            );
            playlistElement = angular.element(
                '<li track="track" playlist-track="true"></li>'
            );

            $parentScope.track = {
                'ID' : 1,
                'Name' : 'Track 1'
            };

            $compile(element)($parentScope);
            $compile(playlistElement)($parentScope);
            $parentScope.$digest();

            controller = element.controller('track');
            playlistController = playlistElement.controller('track');
            scope = element.scope();
        });
    });

    describe('initialisation', function() {
        beforeEach(function() {
            scope.addable = true;
            scope.closable = true;
            scope.$digest();
        });

        it('should display the track Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Track 1');
        });

        it('should call TrackController.select on mousedown', function() {
            spyOn(controller, 'select');

            element.trigger('mousedown');

            expect(controller.select).toHaveBeenCalled();
        });

        it('should call TrackController.add when the add button is clicked', function() {
            spyOn(controller, 'add');

            element.find('button.control-add').trigger('click');

            expect(controller.add).toHaveBeenCalled();
        });

        it('should call TrackController.play when the play button is clicked', function() {
            spyOn(controller, 'play');

            element.find('button.control-play').trigger('click');

            expect(controller.play).toHaveBeenCalled();
        });

        it('should call TrackController.remove when the remove button is clicked', function() {
            spyOn(playlistController, 'remove');

            playlistElement.find('button.control-remove').trigger('click');

            expect(playlistController.remove).toHaveBeenCalled();
        });
    });

    describe('addable', function() {
        it('should display the add and play buttons if the playlist-track attribute is not set', function() {
            expect(element.find('button.control-add').length).toBe(1);
            expect(element.find('button.control-play').length).toBe(1);
        });

        it('should not display the add and play buttons if the playlist-track attribute is set', function() {
            expect(playlistElement.find('button.control-add').length).toBe(0);
            expect(playlistElement.find('button.control-play').length).toBe(0);
        });
    });

    describe('closable', function() {
        it('should display the close button if the playlist-track attribute is not set', function() {
            expect(playlistElement.find('button.control-remove').length).toBe(1);
        });

        it('should not display the closable button if the playlist-track attribute is set', function() {
            expect(element.find('button.control-remove').length).toBe(0);
        });
    });
});
