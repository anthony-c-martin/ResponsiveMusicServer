(function() {
    'use strict';

    angular.module('app.components.error')
        .controller('ErrorController', ErrorController);

    /* @ngInject */
    function ErrorController($rootScope) {
        var ctrl = this;

        function hasError() {
            return !!ctrl.errorMessage;
        }

        $rootScope.$on('app.components.error.ErrorMessage', function(e, errorMessage) {
            ctrl.errorMessage = errorMessage;
        });

        $rootScope.$on('hideDropdowns', function(e, data) {
            if (!(data && data === 'error')) {
                ctrl.errorMessage = null;
            }
        });

        angular.extend(this, {
            errorMessage: null,
            hasError: hasError
        });
    }
})();
