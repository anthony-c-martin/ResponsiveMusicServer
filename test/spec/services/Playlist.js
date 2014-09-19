'use strict';

describe('Service: Playlist', function() {

    var service,
        $q,
        $rootScope,
        ApiRequest;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            ApiRequest = $injector.get('ApiRequest');

            service = $injector.get('Playlist', {
                $q: $q,
                ApiRequest: ApiRequest
            });
        });
    });

    describe('Initialisation', function() {
        it('should initialise the trackArray', function() {
            expect(service.trackArray).toEqual([]);
        });
    });

    describe('addTrack', function() {
        it('should add a new track to an empty track array', function() {
            var mockTrack = {
                Name: 'aasdgbsadg9sag8fubigas'
            };
            service.addTrack(mockTrack, 0);

            expect(service.trackArray.length).toBe(1);
            expect(service.trackArray[0].Name).toBe('aasdgbsadg9sag8fubigas');
        });

        it('should add a new track to the end of a non-empty track array if the position is negative', function() {
            service.trackArray = [{}];
            var mockTrack = {
                Name: 'sdaf9sh8fhs9af8suof'
            };
            service.addTrack(mockTrack, -1);

            expect(service.trackArray.length).toBe(2);
            expect(service.trackArray[1].Name).toBe('sdaf9sh8fhs9af8suof');
        });

        it('should add a new track to the position specified in a non-empty track array', function() {
            service.trackArray = [{}, {}];
            var mockTrack = {
                Name: 'asdgsad8hg9as8dhisdo'
            };
            service.addTrack(mockTrack, 1);

            expect(service.trackArray.length).toBe(3);
            expect(service.trackArray[1].Name).toBe('asdgsad8hg9as8dhisdo');
        });

        it('should create a copy of the track added, and not modify the original track', function() {
            service.trackArray = [];
            var mockTrack = {
                Name: 'asdfsad90f7gsad8f7gsiuh',
                RandomUnusedProperty: 'asdghasg0hsdgh'
            };
            service.addTrack(mockTrack, -1);

            expect(service.trackArray.length).toBe(1);
            expect(service.trackArray[0].Name).toBe('asdfsad90f7gsad8f7gsiuh');
            expect(service.trackArray[0].RandomUnusedProperty).toBe('asdghasg0hsdgh');
            expect(service.trackArray[0]).not.toBe(mockTrack);
        });

        it('should submit a conversion request for the new track if the playlist length is 0', function() {
            service.trackArray = [];
            var mockTrack = {
                ID: 16437,
                Name: 'asduasg087asdfiusdabfjds'
            };
            spyOn(ApiRequest.track, 'convert').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.when({
                            Result: 'Success',
                            FileName: 'asdfus9fbsaufi'
                        });
                    }
                };
            });

            service.addTrack(mockTrack, -1);
            expect(ApiRequest.track.convert).toHaveBeenCalledWith(16437);
            $rootScope.$digest();

            expect(service.trackArray.length).toBe(1);
            expect(service.trackArray[0].Name).toBe('asduasg087asdfiusdabfjds');
            expect(service.trackArray[0].FileName).toBe('asdfus9fbsaufi');
        });

        it('should submit a conversion request for the new track if the playlist length is 0 and log a console warning if an error occurs', function() {
            service.trackArray = [];
            var mockTrack = {
                ID: 15987,
                Name: 'asdf9a8sgf98asdfh9saphoij'
            };
            spyOn(console, 'warn');
            spyOn(ApiRequest.track, 'convert').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.reject('asdofuasdf9gsadfubsadiyfugho');
                    }
                };
            });

            service.addTrack(mockTrack, -1);
            $rootScope.$digest();

            expect(service.trackArray.length).toBe(1);
            expect(service.trackArray[0].Name).toBe('asdf9a8sgf98asdfh9saphoij');
            expect(service.trackArray[0].FileName).toBeUndefined();
            expect(console.warn).toHaveBeenCalledWith('asdofuasdf9gsadfubsadiyfugho');
        });

        it('should only allow one conversion request to be submitted for a track at a time', function() {
            service.trackArray = [];
            var mockTrack = {
                ID: 16437,
                Name: 'asduasg087asdfiusdabfjds'
            };
            spyOn(ApiRequest.track, 'convert').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.defer().promise;
                    }
                };
            });

            service.addTrack(mockTrack, -1);
            expect(service.trackArray.length).toBe(1);
            var newTrack = service.trackArray[0];
            service.trackArray.length = 0;
            service.addTrack(newTrack);
            $rootScope.$digest();

            expect(ApiRequest.track.convert.callCount).toBe(1);
        });
    });

    describe('addTracks', function() {
        it('should call addTrack for every track in the array', function() {
            service.trackArray = [];
            var mockTracks = [{
                Name: 'Track1'
            }, {
                Name: 'Track2'
            }, {
                Name: 'Track3'
            }, {
                Name: 'Track4'
            }];
            spyOn(service, 'addTrack');

            service.addTracks(mockTracks);

            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[0], 0);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[1], 1);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[2], 2);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[3], 3);
            expect(service.addTrack.callCount).toBe(4);
        });

        it('should add the tracks after a given track in the array', function() {
            service.trackArray = [{}, {}];
            var mockTracks = [{
                Name: 'Track1'
            }, {
                Name: 'Track2'
            }, {
                Name: 'Track3'
            }, {
                Name: 'Track4'
            }];
            spyOn(service, 'addTrack');

            service.addTracks(mockTracks, service.trackArray[0], true);

            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[0], 1);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[1], 2);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[2], 3);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[3], 4);
            expect(service.addTrack.callCount).toBe(4);
        });

        it('should add the tracks before a given track in the array', function() {
            service.trackArray = [{}, {}];
            var mockTracks = [{
                Name: 'Track1'
            }, {
                Name: 'Track2'
            }, {
                Name: 'Track3'
            }, {
                Name: 'Track4'
            }];
            spyOn(service, 'addTrack');

            service.addTracks(mockTracks, service.trackArray[1], false);

            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[0], 1);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[1], 2);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[2], 3);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[3], 4);
            expect(service.addTrack.callCount).toBe(4);
        });

        it('should add the tracks at the end if an unknown relativeTrack is specified', function() {
            service.trackArray = [{}, {}];
            var mockTracks = [{
                Name: 'Track1'
            }, {
                Name: 'Track2'
            }, {
                Name: 'Track3'
            }, {
                Name: 'Track4'
            }];
            spyOn(service, 'addTrack');

            service.addTracks(mockTracks, {}, true);

            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[0], 2);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[1], 3);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[2], 4);
            expect(service.addTrack).toHaveBeenCalledWith(mockTracks[3], 5);
            expect(service.addTrack.callCount).toBe(4);
        });
    });

    describe('addTracksByAlbum', function() {
        it('should load the results from the API and add them with the addTracks function', function() {
            service.trackArray = [];
            var mockTracks = [{
                Name: 'Track 1'
            }, {
                Name: 'Track 2'
            }];
            spyOn(service, 'addTracks');
            spyOn(ApiRequest.track, 'getFromAlbum').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.when(mockTracks);
                    }
                };
            });

            service.addTracksByAlbum(34983);
            $rootScope.$digest();

            expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(34983);
            expect(service.addTracks).toHaveBeenCalledWith(mockTracks);
        });
    });

    describe('addTracksByArtist', function() {
        it('should load the results from the API and add them with the addTracks function', function() {
            service.trackArray = [];
            var mockTracks = [{
                Name: 'Track 1'
            }, {
                Name: 'Track 2'
            }];
            spyOn(service, 'addTracks');
            spyOn(ApiRequest.track, 'getFromAlbum').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.when(mockTracks);
                    }
                };
            });

            service.addTracksByAlbum(235235);
            $rootScope.$digest();

            expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(235235);
            expect(service.addTracks).toHaveBeenCalledWith(mockTracks);
        });
    });

    describe('getTrack', function() {
        it('should return a promise and reject it if the playlist is empty', function() {
            var rejectTest = jasmine.createSpy('rejectTest');
            service.trackArray = [];

            service.getTrack().then(function() {}, rejectTest);
            $rootScope.$digest();

            expect(rejectTest).toHaveBeenCalled();
        });

        it('should return the first track in the array, and return a promsise containing it', function() {
            var successTest = jasmine.createSpy('successTest');
            spyOn(window, 'setTimeout');
            spyOn(ApiRequest.track, 'convert').andCallFake(function() {
                return {
                    submit: function() {
                        return $q.when({
                            Result: 'Success',
                            FileName: 'asdfysa8fyvs8fh89'
                        });
                    }
                };
            });
            service.trackArray = [{
                ID: 12358
            }, {
                ID: 98638
            }];

            service.getTrack().then(successTest, function() {});
            $rootScope.$digest();

            expect(successTest).toHaveBeenCalled();
            expect(successTest.mostRecentCall.args[0]).toEqual({
                ID: 12358,
                FileName: 'asdfysa8fyvs8fh89'
            });
            expect(service.trackArray).toEqual([{
                ID: 98638
            }]);
        });

        it('should schedule the next track in the array to start converting in 5s time', function() {
            var successTest = jasmine.createSpy('successTest');
            spyOn(window, 'setTimeout');
            spyOn(ApiRequest.track, 'convert').andCallFake(function(id) {
                return {
                    submit: function() {
                        if (id === 37578) {
                            return $q.when({
                                Result: 'Success',
                                FileName: 'saf97agsf8gsa7fiu'
                            });
                        }
                        return $q.defer().promise;
                    }
                };
            });
            service.trackArray = [{
                ID: 15363
            }, {
                ID: 37578
            }];

            service.getTrack().then(successTest, function() {});
            $rootScope.$digest();

            expect(window.setTimeout).toHaveBeenCalled();
            expect(window.setTimeout.callCount).toBe(1);
            expect(window.setTimeout.mostRecentCall.args[1]).toBe(5000);
            window.setTimeout.mostRecentCall.args[0]();
            $rootScope.$digest();
            expect(service.trackArray).toEqual([{
                ID: 37578,
                FileName: 'saf97agsf8gsa7fiu'
            }]);
        });
    });

    describe('removeTrack', function() {
        it('should remove a track which exists in the playlist', function() {
            service.trackArray = [{
                ID: 18272
            }, {
                ID: 21525
            }];

            var track1 = service.trackArray[1];
            service.removeTrack(track1);

            expect(service.trackArray).toEqual([{
                ID: 18272
            }]);
        });

        it('should not remove a different track object with the same ID as a track in the playlist', function() {
            service.trackArray = [{
                ID: 32632
            }, {
                ID: 35983
            }];

            service.removeTrack({
                ID: 32632
            });

            expect(service.trackArray).toEqual([{
                ID: 32632
            }, {
                ID: 35983
            }]);
        });
    });

    describe('removeTracks', function() {
        it('should call the removeTracks method for each track in the input array', function() {
            spyOn(service, 'removeTrack');
            var trackList = [{}, {}, {}];

            service.removeTracks(trackList);

            expect(service.removeTrack).toHaveBeenCalledWith(trackList[0]);
            expect(service.removeTrack).toHaveBeenCalledWith(trackList[1]);
            expect(service.removeTrack).toHaveBeenCalledWith(trackList[2]);
        });
    });

    describe('clear', function() {
        it('should remove all the items from the track array', function() {
            service.trackArray = [{}, {}, {}];

            service.clear();

            expect(service.trackArray.length).toBe(0);
        });
    });

    describe('deselectAll', function() {
        it('should set the selected property on every item in the track array to false', function() {
            service.trackArray = [{}, {}, {}];

            service.deselectAll();

            expect(service.trackArray[0].selected).toBeFalsy();
            expect(service.trackArray[1].selected).toBeFalsy();
            expect(service.trackArray[2].selected).toBeFalsy();
        });
    });
});
