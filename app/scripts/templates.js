angular.module('musicServerViews', ['album-tracks.partial.html', 'album.partial.html', 'albums.html', 'artist.partial.html', 'artists.html', 'login.html', 'navbar.partial.html', 'playlist.partial.html', 'search.partial.html', 'track.partial.html', 'tracks.html']);

angular.module("album-tracks.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("album-tracks.partial.html",
    "<li class=\"album-tracks\">\n" +
    "    <div class=\"arrow\" ng-style=\"{ left: arrowLeft + 'px' }\"></div>\n" +
    "    <div class=\"inner\">\n" +
    "        <div class=\"close-tracks\">\n" +
    "            <div class=\"controls controls-mini\">\n" +
    "                <button type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <ul class=\"tracks\">\n" +
    "            <li track=\"track\" ng-repeat=\"track in tracks\">\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("album.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("album.partial.html",
    "<li class=\"album\">\n" +
    "    <div class=\"content\">\n" +
    "        <img album-art=\"album\" class=\"hide-sm\" alt=\"\" src=\"/images/default-art.jpg\"/>\n" +
    "        <div class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ album.Name }}</div>\n" +
    "    </div>\n" +
    "    <ul ng-if=\"showTracks && album.tracks\" am-scroll-loader=\"fetchMore()\" class=\"tracks\">\n" +
    "        <li track=\"track\" ng-repeat=\"track in album.tracks\">\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</li>\n" +
    "");
}]);

angular.module("albums.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("albums.html",
    "<div class=\"panes\">\n" +
    "    <div album-list scroll-loader=\"albumRequest.fetch()\" class=\"pane-span\">\n" +
    "        <ul class=\"albums\">\n" +
    "            <li album ng-repeat=\"album in albums\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("artist.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("artist.partial.html",
    "<li class=\"artist\">\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"controls controls-mini\">\n" +
    "            <button ng-click=\"add()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ artist.Name }}</div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"showAlbums && artist.albums\" album-list=\"albumRequest.fetch()\" scroll-loader=\"fetchMore()\">\n" +
    "        <ul class=\"albums\">\n" +
    "            <li album=\"album\" am-show-tracks=\"showTracks\" ng-repeat=\"album in artist.albums\">\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("artists.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("artists.html",
    "<div class=\"panes\">\n" +
    "    <div artist-list scroll-loader=\"artistRequest.fetch()\" class=\"pane-left\">\n" +
    "        <ul class=\"artists\">\n" +
    "            <li artist ng-repeat=\"artist in artists\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div ng-if=\"isDesktop\" album-list scroll-loader=\"albumRequest.fetch()\" class=\"pane-right\">\n" +
    "        <ul class=\"albums\">\n" +
    "            <li album ng-repeat=\"album in albums\" class=\"album\"></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
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

angular.module("navbar.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("navbar.partial.html",
    "<div class=\"navbar\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <div ng-controller=\"NavController\" class=\"controls controls-nav hide-s\">\n" +
    "            <button ng-repeat=\"nav in navs\" ng-click=\"changeLocation(nav.link)\" ng-class=\"{active:isActive(nav.link)}\" type=\"button\" class=\"control\">{{ nav.title }}</button>\n" +
    "        </div>\n" +
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
    "                <div class=\"progress-bar progress-volume\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <button type=\"button\" ng-click=\"togglePlaylistHandler()\" cancel-click-event class=\"control\"><span class=\"glyphicon glyphicon-list\"></span>\n" +
    "            </button>\n" +
    "            <playlist></playlist>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-volume-up\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div class=\"controls controls-nav\">\n" +
    "            <button type=\"button\" class=\"control\"><span class=\"lastfmicon\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <form ng-submit=\"search()\" ng-controller=\"SearchController\" cancel-click-event class=\"controls controls-nav\">\n" +
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
    "    <div cancel-click-event class=\"inner\">\n" +
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
    "    <div ng-switch=\"searchInProgress\" cancel-click-event class=\"inner\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "            <ul class=\"search\">\n" +
    "                <li>Loading...</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <ul ng-controller=\"TrackListController\" ng-if=\"tracks.length > 0\" class=\"search tracks\">\n" +
    "                <li>Tracks<span class=\"link-right\" ng-click=\"redirectToResults('tracks')\">Show all</span></li>\n" +
    "                <li track ng-repeat=\"track in tracks\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-controller=\"AlbumListController\" ng-if=\"albums.length > 0\" class=\"search search-albums\">\n" +
    "                <li>Albums<span class=\"link-right\" ng-click=\"redirectToResults('albums')\">Show all</span></li>\n" +
    "                <li album ng-repeat=\"album in albums\" class=\"album\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-controller=\"ArtistListController\" ng-if=\"artists.length > 0\" class=\"search artists\">\n" +
    "                <li>Artists<span class=\"link-right\" ng-click=\"redirectToResults('artists')\">Show all</span></li>\n" +
    "                <li artist ng-repeat=\"artist in artists\"></li>\n" +
    "            </ul>\n" +
    "            <ul ng-if=\"artists.length + albums.length + tracks.length <= 0\" class=\"search\">\n" +
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
    "            <button ng-click=\"add()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n" +
    "            <button ng-click=\"play()\" type=\"button\" class=\"control\"><span class=\"glyphicon glyphicon-play\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"desc\">{{ track.Name }}</div>\n" +
    "    </div>\n" +
    "</li>\n" +
    "");
}]);

angular.module("tracks.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tracks.html",
    "");
}]);
