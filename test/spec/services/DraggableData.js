'use strict';

describe('Service: DraggableData', function() {

    var service,
        $q,
        $rootScope,
        ApiRequest,
        Playlist;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            ApiRequest = $injector.get('ApiRequest');
            Playlist = $injector.get('Playlist');

            service = $injector.get('DraggableData', {
                ApiRequest: ApiRequest,
                Playlist: Playlist
            });
        });
    });

    describe('bindDragEvents', function() {
        var $element;
        var $event;
        var itemListFunction;
        var itemSelectedFunction;

        beforeEach(function() {
            itemListFunction = jasmine.createSpy('itemListFunction');
            itemSelectedFunction = jasmine.createSpy('itemSelectedFunction');
            $event = jasmine.createSpyObj('$event', ['preventDefault', 'stopPropagation']);
            $event.dataTransfer = {
                setDragImage: jasmine.createSpy('setDragImage')
            };
            $element = jasmine.createSpyObj('$element', ['on']);
        });

        function dragStartFunction(type, $event) {
            service.bindDragEvents($element, {}, type, itemListFunction, itemSelectedFunction);
            return $element.on.argsForCall[0][1]($event);
        }

        function dragEndFunction(type, $event) {
            service.bindDragEvents($element, {}, type, itemListFunction, itemSelectedFunction);
            return $element.on.argsForCall[1][1]($event);
        }

        describe('dragstart', function() {
            it('should bind a dragstart event to the element passed in', function() {
                service.bindDragEvents($element, {}, 'asdf87sg87gui', itemListFunction, itemSelectedFunction);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[0][0]).toBe('dragstart');
            });

            it('should call preventDefault and stopPropagation on the event if the itemSelectedFunction returns false', function() {
                itemSelectedFunction.andReturn(false);

                dragStartFunction('asdfgas87fg', $event);

                expect($event.preventDefault).toHaveBeenCalledWith();
                expect($event.stopPropagation).toHaveBeenCalledWith();
            });

            it('should not call preventDefault and stopPropagation if the itemSelectedFunction doesnt return false', function() {
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn([]);

                dragStartFunction('asdfgas87fg', $event);

                expect($event.preventDefault).not.toHaveBeenCalledWith();
                expect($event.stopPropagation).not.toHaveBeenCalledWith();
            });

            it('should call setDragImage on the dataTransfer object of the dragstart event if getDragElement is set', function() {
                var mockData = [{}, {}, {}];
                var dragElement = {};
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn(mockData);
                service.getDragElement = jasmine.createSpy('getDragElement').andReturn(dragElement);

                dragStartFunction('asdfuasdhui', $event);

                expect(service.getDragElement).toHaveBeenCalledWith(3, 'asdfuasdhui');
                expect($event.dataTransfer.setDragImage).toHaveBeenCalledWith(dragElement, -10, -10);
            });

            it('should not call setDragImage on the dataTransfer object of the dragstart event if getDragElement is not set', function() {
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn([]);

                dragStartFunction('asdf9usad98fh', $event);

                expect($event.dataTransfer.setDragImage).not.toHaveBeenCalled();
            });

            it('should call setTracks if itemType is set to "Track"', function() {
                var mockData = [];
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn(mockData);
                spyOn(service, 'setTracks');

                dragStartFunction('Track', $event);

                expect(service.setTracks).toHaveBeenCalledWith(mockData);
            });

            it('should call setArtists if itemType is set to "Track"', function() {
                var mockData = [];
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn(mockData);
                spyOn(service, 'setArtists');

                dragStartFunction('Artist', $event);

                expect(service.setArtists).toHaveBeenCalledWith(mockData);
            });

            it('should call setAlbums if itemType is set to "Track"', function() {
                var mockData = [];
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn(mockData);
                spyOn(service, 'setAlbums');

                dragStartFunction('Album', $event);

                expect(service.setAlbums).toHaveBeenCalledWith(mockData);
            });
        });

        describe('dragend', function() {
            var scope;
            beforeEach(function() {
                scope = jasmine.createSpyObj('scope', ['$apply']);
                scope.dragoverPost = true;
                scope.dragoverPre = true;
            });

            it('should bind a dragend event to the element passed in', function() {
                service.bindDragEvents($element, {}, 'asdf87sg87gui', itemListFunction, itemSelectedFunction);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[1][0]).toBe('dragend');
            });

            it('should not error if currentHoverScope is not set', function() {
                service.currentHoverScope = null;

                dragEndFunction('asdf98g7', $event);
            });

            it('should reset dragoverPre and dragoverPost on the currentHoverScope if it is set', function() {
                service.currentHoverScope = scope;

                dragEndFunction('asdf98g7', $event);

                expect(scope.dragoverPost).toBeFalsy();
                expect(scope.dragoverPre).toBeFalsy();
                expect(scope.$apply).toHaveBeenCalled();
            });
        });
    });

    describe('bindPlaylistDropEvents', function() {
        var $element;
        var $event;
        var scope;

        beforeEach(function() {
            $event = jasmine.createSpyObj('$event', ['preventDefault', 'stopPropagation']);
            $element = jasmine.createSpyObj('$element', ['on']);
            scope = jasmine.createSpyObj('scope', ['$apply']);
        });

        function dragOverFunction($event) {
            service.bindPlaylistDropEvents($element, scope);
            return $element.on.argsForCall[0][1]($event);
        }

        function dropFunction($event) {
            service.bindPlaylistDropEvents($element, scope);
            return $element.on.argsForCall[1][1]($event);
        }

        describe('dragover', function() {
            it('should bind a dragover event to the element passed in', function() {
                service.bindPlaylistDropEvents($element, scope);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[0][0]).toBe('dragover');
            });

            it('should call preventDefault and stopPropagation on the event', function() {
                dragOverFunction($event);

                expect($event.preventDefault).toHaveBeenCalledWith();
                expect($event.stopPropagation).toHaveBeenCalledWith();
            });
        });

        describe('drop', function() {
            it('should bind a dragover event to the element passed in', function() {
                service.bindPlaylistDropEvents($element, scope);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[1][0]).toBe('drop');
            });

            it('should call preventDefault and stopPropagation on the event', function() {
                dropFunction($event);

                expect($event.preventDefault).toHaveBeenCalledWith();
                expect($event.stopPropagation).toHaveBeenCalledWith();
            });

            it('should add the tracks to the playlist then deselect them', function() {
                var mockTracks = [{}, {}, {}];
                spyOn(Playlist, 'addTracks');
                spyOn(Playlist, 'deselectAll');
                service.setTracks(mockTracks);

                dropFunction($event);
                $rootScope.$digest();

                expect(Playlist.addTracks).toHaveBeenCalledWith(mockTracks);
                expect(Playlist.deselectAll).toHaveBeenCalledWith();
            });
        });
    });

    describe('bindTrackDropEvents', function() {
        var $element;
        var $event;
        var scope;

        beforeEach(function() {
            $event = jasmine.createSpyObj('$event', ['preventDefault', 'stopPropagation']);
            $event.originalEvent = {
                offsetY: 0
            };
            $element = jasmine.createSpyObj('$element', ['on', 'height']);
            scope = jasmine.createSpyObj('scope', ['$apply']);
        });

        function dragOverFunction($event) {
            service.bindTrackDropEvents($element, scope);
            return $element.on.argsForCall[0][1]($event);
        }

        function dropFunction($event) {
            service.bindTrackDropEvents($element, scope);
            return $element.on.argsForCall[1][1]($event);
        }

        describe('dragover', function() {
            beforeEach(function() {
                service.currentHoverScope = jasmine.createSpyObj('scope', ['$apply']);
            });

            it('should bind a dragend event to the element passed in', function() {
                service.bindTrackDropEvents($element, scope);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[0][0]).toBe('dragover');
            });

            it('should call preventDefault and stopPropagation on the event', function() {
                dragOverFunction($event);

                expect($event.preventDefault).toHaveBeenCalledWith();
                expect($event.stopPropagation).toHaveBeenCalledWith();
            });

            it('should update currentHoverScope to be its own scope, and remove hover areas from the previous scope', function() {
                var previousScope = service.currentHoverScope;

                dragOverFunction($event);

                expect(service.currentHoverScope).toBe(scope);
                expect(previousScope.dragoverPre).toBeFalsy();
                expect(previousScope.dragoverPost).toBeFalsy();
                expect(previousScope.$apply).toHaveBeenCalled();
            });

            it('should set dragoverPre if the y offset of the event is less than half the height of the element', function() {
                $element.height.andReturn(123);
                $event.originalEvent.offsetY = 50;

                dragOverFunction($event);

                expect(scope.dragoverPre).toBeTruthy();
                expect(scope.dragoverPost).toBeFalsy();
                expect(scope.$apply).toHaveBeenCalled();
            });

            it('should set dragoverPost if the y offset of the event is more than half the height of the element', function() {
                $element.height.andReturn(156);
                $event.originalEvent.offsetY = 94;

                dragOverFunction($event);

                expect(scope.dragoverPost).toBeTruthy();
                expect(scope.dragoverPre).toBeFalsy();
                expect(scope.$apply).toHaveBeenCalled();
            });

            it('should not call apply on the scope if the values of dragoverPre and dragoverPost are unchanged', function() {
                $element.height.andReturn(156);
                $event.originalEvent.offsetY = 94;
                scope.dragoverPost = true;
                scope.dragoverPre = false;

                dragOverFunction($event);

                expect(scope.dragoverPost).toBeTruthy();
                expect(scope.dragoverPre).toBeFalsy();
                expect(scope.$apply).not.toHaveBeenCalled();
            });
        });

        describe('drop', function() {
            beforeEach(function() {
                service.currentHoverScope = jasmine.createSpyObj('scope', ['$apply']);
            });

            it('should bind a drop event to the element passed in', function() {
                service.bindTrackDropEvents($element, scope);

                expect($element.on).toHaveBeenCalled();
                expect($element.on.callCount).toBe(2);

                expect($element.on.argsForCall[1][0]).toBe('drop');
            });

            it('should call preventDefault and stopPropagation on the event', function() {
                dropFunction($event);

                expect($event.preventDefault).toHaveBeenCalledWith();
                expect($event.stopPropagation).toHaveBeenCalledWith();
            });

            it('should add the track after the hovered track if dragoverPre is false', function() {
                var mockTracks = [{}, {}, {}];
                var mockTrack = {};
                spyOn(Playlist, 'addTracks');
                service.setTracks(mockTracks);
                service.currentHoverScope.dragoverPre = false;
                service.currentHoverScope.track = mockTrack;

                dropFunction($event);
                $rootScope.$digest();

                expect(Playlist.addTracks).toHaveBeenCalledWith(mockTracks, mockTrack, true);
            });

            it('should add the track before the hovered track if dragoverPre is true', function() {
                var mockTracks = [{}, {}, {}];
                var mockTrack = {};
                spyOn(Playlist, 'addTracks');
                service.setTracks(mockTracks);
                service.currentHoverScope.dragoverPre = true;
                service.currentHoverScope.track = mockTrack;

                dropFunction($event);
                $rootScope.$digest();

                expect(Playlist.addTracks).toHaveBeenCalledWith(mockTracks, mockTrack, false);
            });
        });
    });

    describe('setTracks', function() {
        it('should allow getTracks to be called and return a promise containing the tracks added', function() {
            var mockTracks = [{sadf:'asdf'}, {vdiun:'9ashi'}];
            var outputTracks;

            service.setTracks(mockTracks);
            service.getTracks().then(function(tracks) {
                outputTracks = tracks;
            });
            $rootScope.$digest();

            expect(outputTracks).toEqual(mockTracks);
        });
    });

    describe('setArtists', function() {
        var submitFunction = jasmine.createSpy('submitFunction');
        beforeEach(function() {
            spyOn(ApiRequest.track, 'getFromArtist').andCallFake(function(id) {
                return {
                    submit: function() {
                        return submitFunction(id);
                    }
                };
            });
        });

        it('should call ApiRequest.track.getFromArtist for each artist passed in', function() {
            submitFunction.andCallFake(function(id) {
                return $q.when([{
                    ID: id + 4
                }, {
                    ID: id + 5
                }]);
            });
            var outputTracks;

            service.setArtists([{ID: 12384}, {ID: 12049}]);
            service.getTracks().then(function(tracks) {
                outputTracks = tracks;
            });
            $rootScope.$digest();

            expect(ApiRequest.track.getFromArtist).toHaveBeenCalledWith(12384);
            expect(ApiRequest.track.getFromArtist).toHaveBeenCalledWith(12049);
            expect(outputTracks).toEqual([{ID: 12388}, {ID: 12389}, {ID: 12053}, {ID: 12054}]);
        });

        it('should not allow getTracks to return tracks until all ApiRequests have been completed', function() {
            var unresolvedPromise = $q.defer();
            submitFunction.andCallFake(function(id) {
                if (id === 38984) {
                    return unresolvedPromise.promise;
                }
                return $q.when([]);
            });
            var outputTracks;

            service.setArtists([{ID: 38984}, {ID: 12424}]);
            service.getTracks().then(function(tracks) {
                outputTracks = tracks;
            });
            $rootScope.$digest();

            expect(outputTracks).toBeUndefined();
            unresolvedPromise.resolve([{ID: 12329}]);
            $rootScope.$digest();
            expect(outputTracks).toEqual([{ID: 12329}]);
        });

        it('should reject getTracks if any of the ApiRequests fail', function() {
            submitFunction.andCallFake(function(id) {
                if (id === 23539) {
                    return $q.reject();
                }
                return $q.when(['adc']);
            });
            var rejectSpy = jasmine.createSpy('rejectSpy');

            service.setArtists([{ID: 23539}, {ID: 29832}]);
            service.getTracks().then(function() {}, rejectSpy);
            $rootScope.$digest();

            expect(rejectSpy).toHaveBeenCalled();
        });
    });

    describe('setAlbums', function() {
        var submitFunction = jasmine.createSpy('submitFunction');
        beforeEach(function() {
            spyOn(ApiRequest.track, 'getFromAlbum').andCallFake(function(id) {
                return {
                    submit: function() {
                        return submitFunction(id);
                    }
                };
            });
        });

        it('should call ApiRequest.track.getFromAlbum for each album passed in', function() {
            submitFunction.andCallFake(function(id) {
                return $q.when([{
                    ID: id + 4
                }, {
                    ID: id + 5
                }]);
            });
            var outputTracks;

            service.setAlbums([{ID: 12384}, {ID: 12049}]);
            service.getTracks().then(function(tracks) {
                outputTracks = tracks;
            });
            $rootScope.$digest();

            expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(12384);
            expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(12049);
            expect(outputTracks).toEqual([{ID: 12388}, {ID: 12389}, {ID: 12053}, {ID: 12054}]);
        });

        it('should not allow getTracks to return tracks until all ApiRequests have been completed', function() {
            var unresolvedPromise = $q.defer();
            submitFunction.andCallFake(function(id) {
                if (id === 38984) {
                    return unresolvedPromise.promise;
                }
                return $q.when([]);
            });
            var outputTracks;

            service.setAlbums([{ID: 38984}, {ID: 12424}]);
            service.getTracks().then(function(tracks) {
                outputTracks = tracks;
            });
            $rootScope.$digest();

            expect(outputTracks).toBeUndefined();
            unresolvedPromise.resolve([{ID: 12329}]);
            $rootScope.$digest();
            expect(outputTracks).toEqual([{ID: 12329}]);
        });

        it('should reject getTracks if any of the ApiRequests fail', function() {
            submitFunction.andCallFake(function(id) {
                if (id === 23539) {
                    return $q.reject();
                }
                return $q.when(['adc']);
            });
            var rejectSpy = jasmine.createSpy('rejectSpy');

            service.setAlbums([{ID: 23539}, {ID: 29832}]);
            service.getTracks().then(function() {}, rejectSpy);
            $rootScope.$digest();

            expect(rejectSpy).toHaveBeenCalled();
        });
    });
});
