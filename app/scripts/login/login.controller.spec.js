/* jshint -W117, -W030 */
describe('app.login.LoginController', function() {

    var controller;

    beforeEach(module('app.login'));
    beforeEach(inject(function($controller, $httpBackend, $q, $rootScope, $state, $stateParams, md5, ApiFactory) {
        window.$rootScope = $rootScope;
        window.$stateParams = $stateParams;
        window.$state = $state;
        window.md5 = md5;
        window.ApiFactory = ApiFactory;
        window.$q = $q;

        controller = $controller('LoginController', {
            $rootScope: $rootScope,
            $stateParams: $stateParams,
            md5: md5,
            ApiFactory: ApiFactory
        });
    }));

    describe('initialisation', function() {
        it('should initialise the auth object on start', function() {
            expect(controller.auth).toEqual({});
        });
    });

    describe('login', function() {
        beforeEach(function() {
            spyOn($rootScope, '$emit');
        });

        it('should call loginFailed if the getToken request fails', function() {
            spyOn(ApiFactory.session, 'getToken').and.returnValue($q.reject());

            controller.login();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('app.components.error.ErrorMessage', jasmine.anything());
        });

        it('should call loginFailed if the getSession request fails', function() {
            spyOn(ApiFactory.session, 'getToken').and.returnValue($q.when({
                Token: 'asdonasifdsf'
            }));
            spyOn(ApiFactory.session, 'getSession').and.returnValue($q.reject());

            controller.login();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('app.components.error.ErrorMessage', jasmine.anything());
        });

        it('should emit a loginSuccess event when the login request succeeds', function() {
            spyOn(ApiFactory.session, 'getToken').and.returnValue($q.when({
                Token: 'myToksdd09hen'
            }));
            spyOn(ApiFactory.session, 'getSession').and.returnValue($q.when({
                Session: 'asdouas8gs9f9',
                Secret: 'asdgbsa87gs98hfj'
            }));

            controller.login();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('loginSuccess', {
                Key: 'asdouas8gs9f9',
                Secret: 'asdgbsa87gs98hfj'
            });
        });
    });

    describe('attemptAutoLogin', function() {
        beforeEach(function() {
            spyOn($rootScope, '$emit');
            $stateParams.auth = 'myAuthParam';
            $stateParams.token = 'myAuthParam';
        });

        it('should do nothing if the auth state param is not set', function() {
            spyOn(ApiFactory.session, 'getSession');

            delete $stateParams.auth;
            controller.attemptAutoLogin();
            expect(ApiFactory.session.getSession).not.toHaveBeenCalled();
        });

        it('should do nothing if the token state param is not set', function() {
            spyOn(ApiFactory.session, 'getSession');

            delete $stateParams.token;
            controller.attemptAutoLogin();
            expect(ApiFactory.session.getSession).not.toHaveBeenCalled();
        });

        it('should attempt a getSession request and emit an error on failure', function() {
            spyOn(ApiFactory.session, 'getSession').and.returnValue($q.reject());

            controller.attemptAutoLogin();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('app.components.error.ErrorMessage', jasmine.anything());
        });

        it('should attempt a getSession request and emit a loginSuccess event on success', function() {
            spyOn(ApiFactory.session, 'getSession').and.returnValue($q.when({
                Session: 'asdouas8gs9f9',
                Secret: 'asdgbsa87gs98hfj'
            }));

            controller.attemptAutoLogin();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('loginSuccess', {
                Key: 'asdouas8gs9f9',
                Secret: 'asdgbsa87gs98hfj'
            });
        });
    });

});
