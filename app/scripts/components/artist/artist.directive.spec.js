/* jshint -W117, -W030 */
describe('app.components.artist.amArtist', function() {

    beforeEach(module('app.components.artist'));
    beforeEach(inject(function($compile, $rootScope) {
        window.element = angular.element(
            '<li am-artist="artist"></li>'
        );

        $rootScope.artist = {Name: 'Frank Zappa'};
        $compile(element)($rootScope);
        $rootScope.$digest();

        window.scope = element.isolateScope();
    }));

    describe('initialisation', function() {
        it('should display the artist Name property', function() {
            expect(element.find('.content').find('.desc').text()).toBe('Frank Zappa');
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
