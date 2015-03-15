'use strict';

describe('Directive: artist', function() {

    var element,
        controller,
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
                '<li artist="artist"></li>'
            );

            $parentScope.artist = {
                'ID' : 1,
                'Name' : 'Artist 1'
            };

            $compile(element)($parentScope);
            $parentScope.$digest();

            controller = element.controller('artist');
            scope = element.isolateScope();
        });
    });

    describe('initialisation', function() {
        it('should display the artist Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Artist 1');
        });

        it('should call ArtistController.select when clicked', function() {
            spyOn(controller, 'select');

            element.trigger('click');

            expect(controller.select).toHaveBeenCalled();
        });

        it('should call ArtistController.add when the add button is clicked', function() {
            spyOn(controller, 'add');

            element.find('button.control-add').trigger('click');

            expect(controller.add).toHaveBeenCalled();
        });

        it('should call ArtistController.play when the play button is clicked', function() {
            spyOn(controller, 'play');

            element.find('button.control-play').trigger('click');

            expect(controller.play).toHaveBeenCalled();
        });
    });
});
