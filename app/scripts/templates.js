angular.module('musicServerViews', ['album.partial.html', 'artist.partial.html', 'login.html', 'main.html', 'navbar.partial.html', 'playlist.partial.html', 'search.partial.html', 'track.partial.html', 'volume-control.partial.html']);

angular.module("album.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("album.partial.html",
    "<li class=\"album\" ng-click=\"select()\">\n" +
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
    "<li class=\"artist\" ng-click=\"select()\">\n" +
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
    "        <h2>Please sign in</h2>\n" +
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
    "        <div ng-if=\"isPhone\">\n" +
    "            <span ng-if=\"selectedAlbum\">\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectAlbum()\">&lt;</div>\n" +
    "                <div class=\"history-item\">{{ selectedAlbum.Name }}</div>\n" +
    "            </span>\n" +
    "            <span ng-if=\"selectedArtist && !selectedAlbum\">\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectArtist()\">&lt;</div>\n" +
    "                <div class=\"history-item\">{{ selectedArtist.Name }}</div>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!isPhone\">\n" +
    "            <div class=\"history-item clickable\" ng-click=\"deselectArtist()\">Artists</div>\n" +
    "            <span ng-if=\"selectedArtist\">\n" +
    "                <div class=\"history-item\">&gt;</div>\n" +
    "                <div class=\"history-item clickable\" ng-click=\"deselectAlbum()\">{{ selectedArtist.Name }}</div>\n" +
    "            </span>\n" +
    "            <span ng-if=\"selectedAlbum\">\n" +
    "                <div class=\"history-item\">&gt;</div>\n" +
    "                <div class=\"history-item\">{{ selectedAlbum.Name }}</div>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isArtistsShown()\" scroll-loader=\"artistRequest.fetch()\" class=\"pane pane-left\">\n" +
    "        <ul class=\"artists\">\n" +
    "            <li artist ng-repeat=\"artist in artists | limitTo: artists.length track by artist.ID\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isAlbumsShown()\" scroll-loader=\"albumRequest.fetch()\" class=\"pane pane-mid\">\n" +
    "        <ul class=\"albums\">\n" +
    "            <li album ng-repeat=\"album in albums | limitTo: albums.length track by album.ID\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isTracksShown()\" scroll-loader=\"trackRequest.fetch()\" class=\"pane pane-right\">\n" +
    "        <ul class=\"tracks\">\n" +
    "            <li track ng-repeat=\"track in tracks | limitTo: tracks.length track by track.ID\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("navbar.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navbar.partial.html",
    "<div class=\"navbar\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-backward\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-forward\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <div class=\"progress-container control\">\n" +
    "                <div class=\"progress-bar progress-position\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <button type=\"button\" ng-click=\"togglePlaylistHandler()\" body-event-handler=\"playlist\" class=\"control\"><span class=\"glyphicon glyphicon-list\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" ng-click=\"toggleVolumeHandler()\" body-event-handler=\"volume\" class=\"control\"><span class=\"glyphicon glyphicon-volume-up\"></span>\n" +
    "            </button>\n" +
    "            <volume-control></volume-control>\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"lastfmicon\"></span>\n" +
    "            </button>\n" +
    "            <playlist></playlist>\n" +
    "        </div>\n" +
    "        <form ng-submit=\"initSearch()\" ng-controller=\"SearchController\" body-event-handler=\"search\" class=\"controls controls-nav\">\n" +
    "            <input ng-model=\"searchText\" class=\"control\" type=\"text\" placeholder=\"search\" autocomplete=\"off\">\n" +
    "            <button type=\"submit\" class=\"control\"><span class=\"glyphicon glyphicon-search\"></span>\n" +
    "            </button>\n" +
    "            <search></search>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("playlist.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("playlist.partial.html",
    "<div class=\"dropdown\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div body-event-handler=\"playlist\" class=\"inner\">\n" +
    "        <ul class=\"playlist tracks\">\n" +
    "            <li ng-if=\"playlist.length > 0\" class=\"desc\"><span class=\"link-left\" ng-click=\"clearAll()\">Clear All</span><span class=\"link-right\" ng-click=\"clearSelected()\">Clear Selected</span></li>\n" +
    "            <li track ng-repeat=\"track in playlist\"></li>\n" +
    "            <li ng-if=\"playlist.length <= 0\" class=\"desc\">The playlist is empty!</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search.partial.html",
    "<div class=\"dropdown\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div ng-switch=\"searchInProgress\" body-event-handler=\"search\" class=\"inner\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "            <ul class=\"search\">\n" +
    "                <li>Loading...</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <ul ng-if=\"search.tracks.length > 0\" class=\"search tracks\">\n" +
    "                <li>Tracks<span class=\"link-right\" ng-click=\"redirectToResults('tracks')\">Show all</span></li>\n" +
    "                <li track ng-repeat=\"track in search.tracks\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.albums.length > 0\" class=\"search albums\">\n" +
    "                <li>Albums<span class=\"link-right\" ng-click=\"redirectToResults('albums')\">Show all</span></li>\n" +
    "                <li album ng-repeat=\"album in search.albums\" class=\"album\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.artists.length > 0\" class=\"search artists\">\n" +
    "                <li>Artists<span class=\"link-right\" ng-click=\"redirectToResults('artists')\">Show all</span></li>\n" +
    "                <li artist ng-repeat=\"artist in search.artists\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"search.artists.length + search.albums.length + search.tracks.length <= 0\" class=\"search\">\n" +
    "                <li>No results found</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("track.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("track.partial.html",
    "<li class=\"track\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play($event)\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ track.Name }}</div>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("volume-control.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("volume-control.partial.html",
    "<div class=\"dropdown-vol\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div body-event-handler=\"volume\" class=\"inner\">\n" +
    "        <div class=\"progress-bar progress-volume\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
