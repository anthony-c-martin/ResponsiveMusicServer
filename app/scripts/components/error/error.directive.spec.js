/* jshint -W117, -W030 */
describe('app.components.error.amError', function() {

    var element,
        scope;

    beforeEach(module('app.components.error'));

    beforeEach(inject(function($compile, $rootScope) {
        element = angular.element(
            '<am-error></am-error>'
        );

        $compile(element)($rootScope);
        $rootScope.$digest();

        scope = element.isolateScope();
    }));

    describe('initialisation', function() {
        function setErrorMessage(message) {
            scope.vm.errorMessage = message;
            scope.$digest();
        }

        it('should be hidden if there is no error message', function() {
            setErrorMessage('');

            expect(element.find('.error-modal').length).toBe(0);
        });

        it('should display the error message if there is one set', function() {
            setErrorMessage('s9a7dfg8sdifu');

            expect(element.find('.error-modal').length).toBe(1);
            expect(element.find('.error-modal').text()).toBe('s9a7dfg8sdifu');
        });
    });
});
