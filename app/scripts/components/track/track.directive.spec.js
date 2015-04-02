/* jshint -W117, -W030 */
describe('app.components.track.amTrack', function() {

    var element,
        playlistElement,
        scope,
        playlistScope;

    beforeEach(module('app.components.track'));

    beforeEach(inject(function($compile, $rootScope) {
        element = angular.element(
            '<li am-track="track"></li>'
        );
        playlistElement = angular.element(
            '<li am-track="track" playlist-track="true"></li>'
        );

        $rootScope.track = {Name: 'Track 1'};
        $compile(element)($rootScope);
        $compile(playlistElement)($rootScope);
        $rootScope.$digest();

        scope = element.isolateScope();
        playlistScope = playlistElement.isolateScope();
    }));

    describe('initialisation', function() {
        beforeEach(function() {
            scope.addable = true;
            scope.closable = true;
            scope.$digest();
        });

        it('should display the track Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Track 1');
        });

        it('should call select on mousedown', function() {
            spyOn(scope.vm, 'select');

            element.trigger('mousedown');

            expect(scope.vm.select).toHaveBeenCalled();
        });

        it('should call add when the add button is clicked', function() {
            spyOn(scope.vm, 'add');

            element.find('button.control-add').trigger('click');

            expect(scope.vm.add).toHaveBeenCalled();
        });

        it('should call play when the play button is clicked', function() {
            spyOn(scope.vm, 'play');

            element.find('button.control-play').trigger('click');

            expect(scope.vm.play).toHaveBeenCalled();
        });

        it('should call remove when the remove button is clicked', function() {
            spyOn(playlistScope.vm, 'remove');

            playlistElement.find('button.control-remove').trigger('click');

            expect(playlistScope.vm.remove).toHaveBeenCalled();
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
