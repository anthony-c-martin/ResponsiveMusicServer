var requests = {
  GetTrackByID: function() {
    return [200, {}, {}];
  },
  GetTracks: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockTrack(i));
    }

    return [200, output, {}];
  },
  GetAlbums: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockAlbum(i));
    }

    return [200, output, {}];
  },
  GetArtists: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockArtist(i));
    }

    return [200, output, {}];
  },
  SearchTracks: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockTrack(i));
    }

    return [200, output, {}];
  },
  SearchAlbums: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockAlbum(i));
    }

    return [200, output, {}];
  },
  SearchArtists: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockArtist(i));
    }

    return [200, output, {}];
  },
  GetTracksByArtist: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockTrack(i));
    }

    return [200, output, {}];
  },
  GetTracksByAlbum: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockTrack(i));
    }

    return [200, output, {}];
  },
  GetAlbumsByArtist: function(data) {
    var output = [];

    for (var i = data.Start; i < data.Start + data.Limit; i++) {
      output.push(getMockAlbum(i));
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
  ConvertTrackByID: function(data) {
    return [200, {
      Result: 'Success',
      FileName: data.String
    }, {}];
  },
  LFMNowPlayingTrack: function() {
    return [200, {
      Success: true
    }, {}];
  },
  LFMScrobbleTrack: function() {
    return [200, {
      Success: true
    }, {}];
  },
  GetUserPreferences: function() {
    return [200, {
      ScrobblingEnabled: 1
    }, {}];
  }
};

function getMockTrack(id) {
  return {
    ID: id + 1,
    Name: 'Track ' + (id + 1),
    Duration: 60
  };
}

function getMockAlbum(id) {
  return {
    ID: id + 1,
    Name: 'Album ' + (id + 1)
  };
}

function getMockArtist(id) {
  return {
    ID: id + 1,
    Name: 'Artist ' + (id + 1)
  };
}

module.exports = {
  processRequest(data) {
    var command = data.Command;
    delete data.Command;

    if (requests[command] !== undefined) {
      var output = requests[command](data);
      return output;
    }

    return [404, {}, {}];
  }
};
