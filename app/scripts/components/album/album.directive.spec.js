/* jshint -W117, -W030 */
describe('app.components.album.amAlbum', function() {

    var element,
        scope;

    beforeEach(module('app.components.album'));

    beforeEach(inject(function($compile, $rootScope) {
        element = angular.element(
            '<li am-album="album"></li>'
        );

        $rootScope.album = {ID: 1235, Name: 'Album 1'};
        $compile(element)($rootScope);
        $rootScope.$digest();

        scope = element.isolateScope();
    }));

    describe('initialisation', function() {
        it('should display the album Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Album 1');
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
    });
});
