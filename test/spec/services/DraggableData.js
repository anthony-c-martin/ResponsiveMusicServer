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
            $event.originalEvent = {
                dataTransfer: {
                    setDragImage: jasmine.createSpy('setDragImage')
                }
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
                expect($event.originalEvent.dataTransfer.setDragImage).toHaveBeenCalledWith(dragElement, -10, -10);
            });

            it('should not call setDragImage on the dataTransfer object of the dragstart event if getDragElement is not set', function() {
                itemSelectedFunction.andReturn(true);
                itemListFunction.andReturn([]);

                dragStartFunction('asdf9usad98fh', $event);

                expect($event.originalEvent.dataTransfer.setDragImage).not.toHaveBeenCalled();
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
                scope.draoverPre = false;

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
        });
    });

    describe('bindTrackDropEvents', function() {

    });

    describe('setTracks', function() {

    });

    describe('setArtists', function() {

    });

    describe('setAlbums', function() {

    });
});
