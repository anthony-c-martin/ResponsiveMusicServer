'use strict';

angular.module('musicServerApp')
    .directive('errorModal', [
        function() {
            return {
                restrict: 'A',
                controller: 'ErrorModalController',
                link: function(scope, element) {
                    scope.toggleErrorModal = function(show) {
                        if (show) {
                            $(element).modal();
                        } else {
                            $(element).modal('hide');
                        }
                    };

                    $(element).on('hidden.bs.modal', function() {
                        scope.errorText = '';
                    });
                }
            };
        }]);
