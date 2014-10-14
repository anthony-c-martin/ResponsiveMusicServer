(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/album.partial.html',
    '<li class=album ng-click=albumCtrl.select() draggable=true><div class=content><div class="controls controls-mini"><button ng-click=albumCtrl.add($event) type=button class="control control-add"><i class="fa fa-plus"></i></button> <button ng-click=albumCtrl.play($event) type=button class="control control-play"><i class="fa fa-play"></i></button></div><div class=desc>{{ ::albumCtrl.album.Name }}</div></div></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/artist.partial.html',
    '<li class=artist ng-click=artistCtrl.select() draggable=true><div class=content><div class="controls controls-mini"><button ng-click=artistCtrl.add($event) type=button class="control control-add"><i class="fa fa-plus"></i></button> <button ng-click=artistCtrl.play($event) type=button class="control control-play"><i class="fa fa-play"></i></button></div><div class=desc>{{ ::artistCtrl.artist.Name }}</div></div></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/errorModal.partial.html',
    '<div ng-show=!!errorMessage><div class=modal-backdrop></div><div body-event-handler=error class=error-modal>{{ errorMessage }}</div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/login.html',
    '<div class=container><form class=login autocomplete=off><div class=title>Please sign in</div><input ng-model=auth.username class=login-control type=text placeholder=Username name=username required autofocus> <input ng-model=auth.password class=login-control type=password placeholder=Password name=password required> <button ng-click=login() class=login-control>Sign in</button></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/main.html',
    '<div ng-controller="PanelController as panel" class=panes><div class=pane-top ng-if=!isDesktop><div ng-if=isPhone class=history><span ng-if=panel.selectedAlbum><div class="history-item clickable" ng-click=panel.deselectAlbum()><i class="fa fa-chevron-left"></i></div><div class=history-item>{{ panel.selectedAlbum.Name }}</div></span> <span ng-if="panel.selectedArtist && !panel.selectedAlbum"><div class="history-item clickable" ng-click=panel.deselectArtist()><i class="fa fa-chevron-left"></i></div><div class=history-item>{{ panel.selectedArtist.Name }}</div></span></div><div ng-if=!isPhone class=history><span><div class="history-item clickable" ng-click=panel.deselectArtist()>Artists</div></span> <span ng-if=panel.selectedArtist><div class=history-item><i class="fa fa-chevron-right"></i></div><div class="history-item clickable" ng-click=panel.deselectAlbum()>{{ panel.selectedArtist.Name }}</div></span> <span ng-if=panel.selectedAlbum><div class=history-item><i class="fa fa-chevron-right"></i></div><div class=history-item>{{ panel.selectedAlbum.Name }}</div></span></div></div><div ng-if=panel.isArtistsShown() scroll-loader=artistRequest.fetch() class="pane pane-left"><ul class=artists><li artist=artist ng-repeat="artist in artists | limitTo: artists.length track by artist.ID" ng-class="{selected: (artist === panel.selectedArtist)}"></li></ul></div><div ng-if=panel.isAlbumsShown() scroll-loader=albumRequest.fetch() class="pane pane-mid"><ul class=albums><li album=album ng-repeat="album in albums | limitTo: albums.length track by album.ID" ng-class="{selected: (album === panel.selectedAlbum)}"></li></ul></div><div ng-mousedown=panel.deselectTracks($event) ng-if=panel.isTracksShown() scroll-loader=trackRequest.fetch() class="pane pane-right"><ul class=tracks><li track=track track-area=panel.trackArea ng-repeat="track in tracks | limitTo: tracks.length track by track.ID"></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/navbar.partial.html',
    '<div class=navbar ng-controller="PlayerController as playerCtrl"><div ng-if=isPhone class=navbar-inner><div progress-container class="controls controls-nav shrinkable"><div ng-click=positionChange($event) class="prog-container control"><div ng-style="{width: (position * 100) + \'%\'}" class=prog-bar></div><div ng-if=track class=track-info>{{ track.Name }} - {{ track.Artist.Name }}</div></div></div></div><div class=navbar-inner><div class="controls controls-nav unshrinkable"><button ng-click=playerCtrl.prev() type=button class=control><i class="fa fa-fast-backward"></i></button> <button ng-click=playerCtrl.togglePause() type=button class=control><i ng-if=!playing class="fa fa-play"></i> <i ng-if=playing class="fa fa-pause"></i></button> <button ng-click=playerCtrl.next() type=button class=control><i class="fa fa-fast-forward"></i></button></div><div ng-if=!isPhone progress-container class="controls controls-nav shrinkable"><div ng-click=positionChange($event) class="prog-container control"><div ng-style="{width: (position * 100) + \'%\'}" class=prog-bar></div><div ng-if=track class=track-info>{{ track.Name }} - {{ track.Artist.Name }}</div></div></div><div class="controls controls-nav unshrinkable"><div class=control-container><button playlist-button ng-click="playlistShown = !playlistShown" ng-class="{active: playlistShown}" body-event-handler=playlist type=button class=control><i class="fa fa-list"></i></button><playlist ng-show=playlistShown></playlist></div><div class=control-container><button ng-click="volumeShown = !volumeShown" ng-class="{active: volumeShown}" body-event-handler=volume type=button class=control><i class="fa fa-volume-up"></i></button><volume-control ng-show=volumeShown></volume-control></div><button ng-click=toggleScrobblingEnabled() ng-class="{active: scrobblingEnabled}" type=button class=control><i class="fa fa-lastfm"></i></button></div><form ng-submit=search() ng-controller=SearchController body-event-handler=search class="controls controls-nav shrinkable controls-search"><search ng-show=searchShown></search><input ng-model=searchText class=control type=text placeholder=search autocomplete=off> <button ng-class="{active: searchShown}" type=submit class=control><i class="fa fa-search"></i></button></form></div><audio-player></audio-player></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/playlist.partial.html',
    '<div class=dropdown-playlist><div class=arrow></div><div body-event-handler=playlist class=inner><ul class="playlist tracks"><li ng-if="playlist.length > 0" class=desc><span class=link-left ng-click=playlistCtrl.removeAll()>Clear All</span> <span class=link-right ng-click=playlistCtrl.removeSelection()>Clear Selected</span></li><li track=track track-area=playlistArea playlist-track=true ng-repeat="track in playlist"></li><li ng-if="playlist.length <= 0" class=desc>This playlist is empty!</li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/search.partial.html',
    '<div class=dropdown-search><div class=arrow></div><div ng-switch=searchInProgress body-event-handler=search class=inner><div ng-switch-when=true class=search-loading><ul class=search><li class=desc>Loading...</li></ul></div><div ng-switch-default class=search-results><ul ng-if="searchResults.tracks.length > 0" class="search tracks"><li class=desc>Tracks<span class=link-right ng-click="redirectToResults(\'tracks\')">Show all</span></li><li track=track ng-repeat="track in searchResults.tracks"></li></ul><ul ng-if="searchResults.albums.length > 0" class="search albums"><li class=desc>Albums<span class=link-right ng-click="redirectToResults(\'albums\')">Show all</span></li><li album=album ng-repeat="album in searchResults.albums"></li></ul><ul ng-if="searchResults.artists.length > 0" class="search artists"><li class=desc>Artists<span class=link-right ng-click="redirectToResults(\'artists\')">Show all</span></li><li artist=artist ng-repeat="artist in searchResults.artists"></li></ul><ul ng-if="searchResults.artists.length + searchResults.albums.length + searchResults.tracks.length <= 0" class=search><li class=desc>No results found</li></ul></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/track.partial.html',
    '<li class=track ng-class="{selected: trackCtrl.track.selected, \'dropzone-pre\': dragoverPre, \'dropzone-post\': dragoverPost}" ng-mousedown=trackCtrl.select($event) draggable=true><div class=content><div ng-if=addable class="controls controls-mini"><button ng-click=trackCtrl.add($event) type=button class="control control-add"><i class="fa fa-plus"></i></button> <button ng-click=trackCtrl.play($event) type=button class="control control-play"><i class="fa fa-play"></i></button></div><div ng-if=closable class="controls controls-mini"><button ng-click=trackCtrl.remove($event) type=button class="control control-remove"><i class="fa fa-remove"></i></button></div><div class=desc>{{ ::trackCtrl.track.Name }}</div></div></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('musicServerApp.views');
} catch (e) {
  module = angular.module('musicServerApp.views', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/volumeControl.partial.html',
    '<div class=dropdown-volume><div class=arrow></div><div body-event-handler=volume class=inner><div ng-click=volumeChange($event) class=vol-container><div ng-style="{height: (volume * 100) + \'%\'}" class=vol-bar></div></div></div></div>');
}]);
})();
