'use strict';

describe('Controller: AudioController', function() {

    var controller,
        PlayerService,
        SessionData,
        $scope,
        $rootScope;

    var eventHandlers = {};

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('AudioController', {
                PlayerService: PlayerService,
                SessionData: SessionData
            });
        });

        spyOn(SessionData, 'getSession').andReturn({
            Key: 'a9udfbabfg9s87ag87agsf7h'
        })

        spyOn(PlayerService, 'on').andCallFake(function(event, handler) {
            eventHandlers[event] = handler;
        });
    });

    describe('trackChange event', function() {
        it('should update variables based on the track data', function() {
            var track = {
                ID: 1,
                FileName: '1325123ag9h98hagag8787'
            };
            eventHandlers.trackChange(track);

            expect(controller.src).toBe('');
            expect(controller.type).toBe('audio/mp4');
        });
    });
});
