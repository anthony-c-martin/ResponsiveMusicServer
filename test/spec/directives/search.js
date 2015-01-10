'use strict';

describe('Directive: search', function() {

    var element,
        scope,
        controller,
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
                '<search></search>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
            controller = element.controller();
        });
    });

    describe('Initialisation', function() {
        it('should not show the results if inProgress is true', function() {
            controller.inProgress = true;
            scope.$digest();

            expect(element.find('.search-loading').find('.desc').text()).toBe('Loading...');
            expect(element.find('.search-results').length).toBe(0);
        });
    });

    describe('searchResults', function() {
        beforeEach(function() {
            controller.inProgress = false;
            controller.searchResults = {
                artists: [],
                albums: [],
                tracks: []
            };
            scope.$digest();
        });

        it('should show the results if inProgress is false', function() {
            controller.inProgress = false;
            scope.$digest();

            expect(element.find('.search-loading').find('.desc').length).toBe(0);
            expect(element.find('.search-results').length).toBe(1);
        });

        it('should show a message if there are no results', function() {
            expect(element.find('.search-loading').find('.desc').length).toBe(0);
            expect(element.find('.search-results').find('.desc').text()).toBe('No results found');
            expect(element.find('.search-results').find('.search.tracks').length).toBe(0);
            expect(element.find('.search-results').find('.search.artists').length).toBe(0);
            expect(element.find('.search-results').find('.search.albums').length).toBe(0);
        });

        it('should show tracks if tracks were found', function() {
            controller.searchResults.tracks.push({
                ID: 32525,
                Name: 'asdfisgdfgsf'
            }, {
                ID: 23535,
                Name: 'asdf9sa7dgf9u'
            });
            scope.$digest();

            expect(element.find('.search-results').find('.search.tracks').find('.track').length).toBe(2);
        });

        it('should call redirectToResults if Show All is clicked for the tracks', function() {
            controller.redirectToResults = jasmine.createSpy('redirectToResults');
            controller.searchResults.tracks.push({
                ID: 32525,
                Name: 'asdfisgdfgsf'
            });
            scope.$digest();

            element.find('.search-results').find('.search.tracks').find('.link-right').trigger('click');

            expect(controller.redirectToResults).toHaveBeenCalledWith('tracks');
        });

        it('should show albums if albums were found', function() {
            controller.searchResults.albums.push({
                ID: 22425,
                Name: 'asdfs9a7gf87gi'
            }, {
                ID: 25112,
                Name: 'asdfs9adfgiusdfu'
            });
            scope.$digest();

            expect(element.find('.search-results').find('.search.albums').find('.album').length).toBe(2);
        });

        it('should call redirectToResults if Show All is clicked for the albums', function() {
            controller.redirectToResults = jasmine.createSpy('redirectToResults');
            controller.searchResults.albums.push({
                ID: 12547,
                Name: 'asdfs97agfiuhsdjfi'
            });
            scope.$digest();

            element.find('.search-results').find('.search.albums').find('.link-right').trigger('click');

            expect(controller.redirectToResults).toHaveBeenCalledWith('albums');
        });

        it('should show tracks if tracks were found', function() {
            controller.searchResults.artists.push({
                ID: 35398,
                Name: 'asdf87gsda7fuih'
            }, {
                ID: 12976,
                Name: 'asd9f7g8gisadfh'
            });
            scope.$digest();

            expect(element.find('.search-results').find('.search.artists').find('.artist').length).toBe(2);
        });

        it('should call redirectToResults if Show All is clicked for the artists', function() {
            controller.redirectToResults = jasmine.createSpy('redirectToResults');
            controller.searchResults.artists.push({
                ID: 39182,
                Name: 'asdf9asg7df807gsa8f7'
            });
            scope.$digest();

            element.find('.search-results').find('.search.artists').find('.link-right').trigger('click');

            expect(controller.redirectToResults).toHaveBeenCalledWith('artists');
        });
    });

    describe('hideDropdowns', function() {
        it('should set the searchShown scope variable to false on the hideDropdowns event', function() {
            controller.searchShown = true;

            $rootScope.$emit('hideDropdowns', 'asdf');

            expect(controller.searchShown).toBeFalsy();
        });

        it('should not set the searchShown scope variable to false on the hideDropdowns event with data set to "search"', function() {
            controller.searchShown = true;

            $rootScope.$emit('hideDropdowns', 'search');

            expect(controller.searchShown).toBeTruthy();
        });
    });
});
