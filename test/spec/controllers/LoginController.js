'use strict';

describe('Controller: LoginController', function() {

    var controller,
        ApiRequest,
        $scope,
        $rootScope,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            ApiRequest = $injector.get('ApiRequest');
            var $controller = $injector.get('$controller');

            controller = $controller('LoginController', {
                $rootScope: $rootScope,
                $scope: $scope,
                ApiRequest: ApiRequest
            });
        });
    });

    describe('Initialisation', function() {
        it('should initialise the auth object on start', function() {
            expect(controller.auth).toEqual({});
        });
    });

    describe('loginFailed', function() {
        it('should log an error and display an error when calling the loginFailed function', function() {
            spyOn(console, 'warn');
            spyOn($rootScope, '$emit');

            controller.loginFailed('asdiabsiusavfusyavfuysd');
            expect(console.warn).toHaveBeenCalledWith('asdiabsiusavfusyavfuysd');
            expect(console.warn.calls.count()).toBe(1);
            expect($rootScope.$emit).toHaveBeenCalledWith('errorDisplay', 'Login attempt failed. Please try again.');
            expect($rootScope.$emit.calls.count()).toBe(1);
        });
    });

    describe('authString', function() {
        it('should correctly generate auth strings', function() {
            expect(controller.authString('myUsername', 'myPassword', 'myToken')).toBe('c97cfcc0a13092b18d8dd3912112f71a');
            expect(controller.authString('dfgsdf0ghi', 'asdfsubisd', 'myToksdd09hen')).toBe('d77d1465d59a51b60d9ec1e79a58c921');
            expect(controller.authString('sdn9gfdg', 'sdfg08dh9g', 'sagasdg')).toBe('ef4de70da765515f55cf73ef462065e6');
            expect(controller.authString('s0gh8hfd9gho', 'dfg0sdh89', 'myToken')).toBe('502fcedff4e12b59756e7a4c465e77cf');
        });
    });

    describe('login', function() {
        it('should call loginFailed if the getToken request fails', function() {
            spyOn(ApiRequest.session, 'getToken').and.returnValue({
                submit: function() {
                    return $q.reject();
                }
            });
            spyOn(controller, 'loginFailed');

            controller.login();
            $scope.$digest();

            expect(controller.loginFailed).toHaveBeenCalledWith();
            expect(controller.loginFailed.calls.count()).toBe(1);
        });

        it('should call loginFailed if the getSession request fails', function() {
            spyOn(ApiRequest.session, 'getToken').and.returnValue({
                submit: function() {
                    return $q.when({
                        Token: 'asdonasifdsf'
                    });
                }
            });
            spyOn(ApiRequest.session, 'getSession').and.returnValue({
                submit: function() {
                    return $q.reject();
                }
            });
            spyOn(controller, 'loginFailed');

            controller.login();
            $scope.$digest();

            expect(controller.loginFailed).toHaveBeenCalledWith();
            expect(controller.loginFailed.calls.count()).toBe(1);
        });

        it('should emit a loginSuccess event when the login request succeeds', function() {
            spyOn(ApiRequest.session, 'getToken').and.returnValue({
                submit: function() {
                    return $q.when({
                        Token: 'myToksdd09hen'
                    });
                }
            });
            spyOn(ApiRequest.session, 'getSession').and.returnValue({
                submit: function() {
                    return $q.when({
                        Session: 'asdouas8gs9f9',
                        Secret: 'asdgbsa87gs98hfj'
                    });
                }
            });
            controller.auth = {
                username: 'dfgsdf0ghi',
                password: 'asdfsubisd'
            };

            spyOn($scope, '$emit');

            controller.login();
            $scope.$digest();

            expect(ApiRequest.session.getToken).toHaveBeenCalledWith();
            expect(ApiRequest.session.getToken.calls.count()).toBe(1);
            expect(ApiRequest.session.getSession).toHaveBeenCalledWith('myToksdd09hen', 'd77d1465d59a51b60d9ec1e79a58c921');
            expect(ApiRequest.session.getSession.calls.count()).toBe(1);

            expect($scope.$emit).toHaveBeenCalled();
            expect($scope.$emit.calls.count()).toBe(1);
            expect($scope.$emit.calls.mostRecent().args.length).toBe(2);
            expect($scope.$emit.calls.mostRecent().args[0]).toBe('loginSuccess');
            expect($scope.$emit.calls.mostRecent().args[1].Key).toBe('asdouas8gs9f9');
            expect($scope.$emit.calls.mostRecent().args[1].Secret).toBe('asdgbsa87gs98hfj');
        });
    });

});
