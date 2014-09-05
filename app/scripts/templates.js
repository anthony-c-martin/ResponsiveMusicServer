angular.module('musicServerViews', ['album.partial.html', 'artist.partial.html', 'login.html', 'main.html', 'navbar.partial.html', 'playlist.partial.html', 'search.partial.html', 'track.partial.html', 'volume-control.partial.html']);

angular.module("album.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("album.partial.html",
    "<li class=\"album\" ng-click=\"select()\" draggable=\"true\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ album.Name }}</div>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("artist.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("artist.partial.html",
    "<li class=\"artist\" ng-click=\"select()\" draggable=\"true\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ artist.Name }}</div>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.html",
    "<div class=\"container\">\n" +
    "    <form class=\"login\" autocomplete=\"off\">\n" +
    "        <div class=\"title\">Please sign in</div>\n" +
    "        <input ng-model=\"auth.username\" class=\"login-control\" type=\"text\" placeholder=\"Username\" name=\"username\" required=\"\" autofocus=\"\">\n" +
    "        <input ng-model=\"auth.password\" class=\"login-control\" type=\"password\" placeholder=\"Password\" name=\"password\" required=\"\">\n" +
    "        <button ng-click=\"login()\" class=\"login-control\">Sign in</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("main.html",
    "<div ng-controller=\"PanelController\" class=\"panes\">\n" +
    "    <div class=\"pane-top\" ng-if=\"!isDesktop\">\n" +
    "        <div ng-if=\"isPhone\" class=\"history\">\n" +
    "            <span ng-if=\"selectedAlbum\">\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectAlbum()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\n" +
    "                <div class=\"history-item\">{{ selectedAlbum.Name }}</div>\n" +
    "            </span>\n" +
    "            <span ng-if=\"selectedArtist && !selectedAlbum\">\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectArtist()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\n" +
    "                <div class=\"history-item\">{{ selectedArtist.Name }}</div>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!isPhone\" class=\"history\">\n" +
    "            <span>\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectArtist()\">Artists</div>\n" +
    "            </span>\n" +
    "            <span ng-if=\"selectedArtist\">\n" +
    "                <div class=\"history-item\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectAlbum()\">{{ selectedArtist.Name }}</div>\n" +
    "            </span>\n" +
    "            <span ng-if=\"selectedAlbum\">\n" +
    "                <div class=\"history-item\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\n" +
    "                <div class=\"history-item\">{{ selectedAlbum.Name }}</div>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isArtistsShown()\" scroll-loader=\"artistRequest.fetch()\" class=\"pane pane-left\">\n" +
    "        <ul class=\"artists\">\n" +
    "            <li artist=\"artist\" ng-repeat=\"artist in artists | limitTo: artists.length track by artist.ID\" ng-class=\"{selected: (artist === selectedArtist)}\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isAlbumsShown()\" scroll-loader=\"albumRequest.fetch()\" class=\"pane pane-mid\">\n" +
    "        <ul class=\"albums\">\n" +
    "            <li album=\"album\" ng-click=\"select()\" ng-repeat=\"album in albums | limitTo: albums.length track by album.ID\" ng-class=\"{selected: (album === selectedAlbum)}\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-mousedown=\"deselectTracks($event)\" ng-if=\"isTracksShown()\" scroll-loader=\"trackRequest.fetch()\" class=\"pane pane-right\">\n" +
    "        <ul class=\"tracks\">\n" +
    "            <li track=\"track\" track-area=\"trackArea\" ng-repeat=\"track in tracks | limitTo: tracks.length track by track.ID\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("navbar.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navbar.partial.html",
    "<div class=\"navbar\" ng-controller=\"PlayerController\">\n" +
    "    <div ng-if=\"isPhone\" class=\"navbar-inner\">\n" +
    "        <div class=\"width100 controls controls-nav\">\n" +
    "            <div class=\"width100 progress-container control\">\n" +
    "                <div class=\"progress-bar progress-position\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <div class=\"controls controls-nav unshrinkable\">\n" +
    "            <button type=\"button\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-fast-backward\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-play\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-fast-forward\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!isPhone\" class=\"controls controls-nav shrinkable\">\n" +
    "            <div ng-click=\"positionChange($event)\" class=\"prog-container control\">\n" +
    "                <div ng-style=\"{width: (position * 100) + '%'}\" class=\"prog-bar\"></div>\n" +
    "                <div ng-if=\"track\" class=\"track-info\">{{ track.Name }} - {{ track.Artist.Name }}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav unshrinkable\">\n" +
    "            <button playlist-button ng-click=\"playlistShown = !playlistShown\" ng-class=\"{active: playlistShown}\" body-event-handler=\"playlist\" type=\"button\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-list\"></span>\n" +
    "                <playlist ng-show=\"playlistShown\"></playlist>\n" +
    "            </button>\n" +
    "            <button ng-click=\"volumeShown = !volumeShown\" ng-class=\"{active: volumeShown}\" body-event-handler=\"volume\" type=\"button\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-volume-up\"></span>\n" +
    "                <volume-control ng-show=\"volumeShown\"></volume-control>\n" +
    "            </button>\n" +
    "            <button ng-click=\"toggleScrobblingEnabled()\" ng-class=\"{active: scrobblingEnabled}\" type=\"button\" class=\"control\">\n" +
    "                <span class=\"lastfmicon\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <form ng-submit=\"initSearch()\" ng-controller=\"SearchController\" body-event-handler=\"search\" class=\"controls controls-nav shrinkable controls-search\">\n" +
    "            <search ng-show=\"searchShown\"></search>\n" +
    "            <input ng-model=\"searchText\" class=\"control\" type=\"text\" placeholder=\"search\" autocomplete=\"off\">\n" +
    "            <button ng-class=\"{active: searchShown}\" type=\"submit\" class=\"control\">\n" +
    "                <span class=\"glyphicon glyphicon-search\"></span>\n" +
    "            </button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <audio-player></audio-player>\n" +
    "</div>\n" +
    "");
}]);

angular.module("playlist.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("playlist.partial.html",
    "<div class=\"dropdown-playlist\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div body-event-handler=\"playlist\" class=\"inner\">\n" +
    "        <ul class=\"playlist tracks\">\n" +
    "            <li ng-if=\"playlist.length > 0\" class=\"desc\"><span class=\"link-left\" ng-click=\"clearAll()\">Clear All</span><span class=\"link-right\" ng-click=\"clearSelected()\">Clear Selected</span></li>\n" +
    "            <li track=\"track\" track-area=\"playlistArea\" playlist-track=\"true\" ng-repeat=\"track in playlist\"></li>\n" +
    "            <li ng-if=\"playlist.length <= 0\" class=\"desc\">The playlist is empty!</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search.partial.html",
    "<div class=\"dropdown-search\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div ng-switch=\"searchInProgress\" body-event-handler=\"search\" class=\"inner\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "            <ul class=\"search\">\n" +
    "                <li class=\"desc\">Loading...</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <ul ng-if=\"search.tracks.length > 0\" class=\"search tracks\">\n" +
    "                <li class=\"desc\">Tracks<span class=\"link-right\" ng-click=\"redirectToResults('tracks')\">Show all</span></li>\n" +
    "                <li track=\"track\" ng-repeat=\"track in search.tracks\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.albums.length > 0\" class=\"search albums\">\n" +
    "                <li class=\"desc\">Albums<span class=\"link-right\" ng-click=\"redirectToResults('albums')\">Show all</span></li>\n" +
    "                <li album=\"album\" ng-repeat=\"album in search.albums\" class=\"album\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.artists.length > 0\" class=\"search artists\">\n" +
    "                <li class=\"desc\">Artists<span class=\"link-right\" ng-click=\"redirectToResults('artists')\">Show all</span></li>\n" +
    "                <li artist=\"artist\" ng-repeat=\"artist in search.artists\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.artists.length + search.albums.length + search.tracks.length <= 0\" class=\"search\">\n" +
    "                <li class=\"desc\">No results found</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("track.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("track.partial.html",
    "<li class=\"track\" ng-class=\"{selected: track.selected}\" ng-mousedown=\"select($event)\" draggable=\"true\">\n" +
    "    <div class=\"content\">\n" +
    "        <div ng-if=\"addable\" class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div ng-if=\"closable\" class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"remove($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ track.Name }}</div>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("volume-control.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("volume-control.partial.html",
    "<div class=\"dropdown-volume\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div body-event-handler=\"volume\" class=\"inner\">\n" +
    "        <div ng-click=\"volumeChange($event)\" class=\"vol-container\">\n" +
    "            <div ng-style=\"{height: (volume * 100) + '%'}\" class=\"vol-bar\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
