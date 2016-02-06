/* jshint -W117, -W030 */
describe('app.components.misc.amScrollLoader', function() {

    var element,
        scope;

    beforeEach(module('app.components.misc'));
    beforeEach(inject(function($compile, $rootScope) {
        element = angular.element(
            '<div am-scroll-loader="testFunction()"></div>'
        );

        $rootScope.testFunction = jasmine.createSpy('testFunction');
        $compile(element)($rootScope);
        $rootScope.$digest();

        scope = element.scope();
    }));

    describe('scroll', function() {
        it('should call the scope function on scroll if close to the bottom of the container', function() {
            scope.testFunction.calls.reset();

            element.trigger('scroll');

            expect(scope.testFunction).toHaveBeenCalledWith();
        });
    });
});
