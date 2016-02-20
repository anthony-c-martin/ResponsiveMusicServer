/* jshint -W117, -W030 */
describe('app.components.track.amTrack', function() {

    beforeEach(module('app.components.track'));
    beforeEach(inject(function($compile, $rootScope) {
        window.element = angular.element(
            '<li am-track="track"></li>'
        );
        window.playlistElement = angular.element(
            '<li am-track="track" am-playlist-track="true"></li>'
        );

        $rootScope.track = {Name: 'Uncle Remus'};
        $compile(element)($rootScope);
        $compile(playlistElement)($rootScope);
        $rootScope.$digest();

        window.scope = element.isolateScope();
        window.playlistScope = playlistElement.isolateScope();
    }));

    describe('initialisation', function() {
        beforeEach(function() {
            scope.addable = true;
            scope.closable = true;
            scope.$digest();
        });

        it('should display the track Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Uncle Remus');
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
        it('should display the add and play buttons if the am-playlist-track attribute is not set', function() {
            expect(element.find('button.control-add').length).toBe(1);
            expect(element.find('button.control-play').length).toBe(1);
        });

        it('should not display the add and play buttons if the am-playlist-track attribute is set', function() {
            expect(playlistElement.find('button.control-add').length).toBe(0);
            expect(playlistElement.find('button.control-play').length).toBe(0);
        });
    });

    describe('closable', function() {
        it('should display the close button if the am-playlist-track attribute is not set', function() {
            expect(playlistElement.find('button.control-remove').length).toBe(1);
        });

        it('should not display the closable button if the am-playlist-track attribute is set', function() {
            expect(element.find('button.control-remove').length).toBe(0);
        });
    });
});
