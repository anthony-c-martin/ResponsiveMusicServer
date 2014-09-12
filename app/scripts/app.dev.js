'use strict';

angular.module('musicServerAppDev', ['musicServerApp', 'ngMockE2E'])
    .run(['$httpBackend',
        function($httpBackend) {
            $httpBackend.whenPOST('/api').respond(function(method, url, jsonData) {
                var data = JSON.parse(jsonData);
                var command = data.Command;
                delete data.Command;

                if (requests[command] !== 'undefined') {
                    var output = requests[command](data);
                    console.log({
                        command: command,
                        input: data,
                        output: output
                    });
                    return output;
                }

                console.warn({
                    error: 404,
                    command: command,
                    input: data
                })
                return [404, {}, {}];
            });

            $httpBackend.whenGET(/^/).passThrough();

            var requests = {
                GetTrackByID: function() {
                    return [200, {}, {}];
                },
                GetTracks: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Track ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetAlbums: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Album ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetArtists: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Artist ' + i
                        });
                    }

                    return [200, output, {}];
                },
                SearchTracks: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Track ' + i
                        });
                    }

                    return [200, output, {}];
                },
                SearchAlbums: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Album ' + i
                        });
                    }

                    return [200, output, {}];
                },
                SearchArtists: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Artist ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetTracksByArtist: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Track ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetTracksByAlbum: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Track ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetAlbumsByArtist: function(data) {
                    var output = [];

                    for (var i = data.Start; i < data.Start + data.Limit; i++) {
                        output.push({
                            ID: i,
                            Name: 'Album ' + i
                        });
                    }

                    return [200, output, {}];
                },
                GetToken: function() {
                    return [200, {
                        Token: 'abcdefghijklmnopqrstuvxyz'
                    }, {}];
                },
                GetSession: function() {
                    return [200, {
                        Session: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    }, {}];
                },
                ConvertTrackByID: function() {
                    return [200, {
                        Success: true
                    }, {}];
                },
                LFMNowPlayingTrack: function() {
                    return [200, {

                    }, {}];
                },
                LFMScrobbleTrack: function() {
                    return [200, {

                    }, {}];
                },
                GetUserPreferences: function() {
                    return [200, {
                        ScrobblingEnabled: 1
                    }, {}];
                }
            };
        }]);
