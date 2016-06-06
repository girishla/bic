/* @ngInject */
export function skinsProvider($mdThemingProvider, uicoreThemingProvider) {
  var skins = {};
  var currentSkin = null;
  var useSkinCookie = false;

  return {
    skin: function (id, name) {
      if (angular.isDefined(skins[id])) {
        return skins[id];
      }

      var skin = new Skin(id, name, $mdThemingProvider, uicoreThemingProvider);

      skins[id] = skin;

      return skins[id];
    },
    setSkin: function (id) {
      if (angular.isUndefined(skins[id])) {
        return;
      }

      // set skin to selected skin
      currentSkin = skins[id];

      // override the skin if cookie is enabled and has been set
      if (useSkinCookie) {
        // we need to check cookies to see if skin has been saved so inject it
        var $cookies;
        angular.injector(['ngCookies']).invoke(['$cookies', function (cookies) {
          $cookies = cookies;
        }]);
        // if we have a cookie set then override the currentSkin
        var uicoreSkin = $cookies.get('uicore-skin');
        if (angular.isDefined(uicoreSkin)) {
          var cookieTheme = angular.fromJson(uicoreSkin);
          currentSkin = angular.isDefined(skins[cookieTheme.skin]) ? skins[cookieTheme.skin] : skins[0];
        }
      }

      // make material load the themes needed for the skin
      currentSkin.loadThemes();

      return currentSkin;
    },
    useSkinCookie: function (skinCookie) {
      useSkinCookie = skinCookie;
    },
    $get: function () {
      return {
        getCurrent: function () {
          return currentSkin;
        },
        getSkins: function () {
          return skins;
        }
      };
    }
  };
}

/* @ngInject */
export function Skin(id, name, $mdThemingProvider, uicoreThemingProvider) {
  var THEMABLE_ELEMENTS = ['sidebar', 'logo', 'toolbar', 'content'];
  var self = this;
  self.id = id;
  self.name = name;
  self.elements = {};

  THEMABLE_ELEMENTS.forEach(function (element) {
    self[element + 'Theme'] = function setElementTheme(themeName) {
      self.elements[element] = themeName;
      return self;
    };
  });

  self.loadThemes = function () {
    // go through each element
    for (var element in self.elements) {
      // register theme with mdThemingProvider (will load css in the header)
      var theme = uicoreThemingProvider.theme(self.elements[element]);

      $mdThemingProvider.theme(theme.name)
        .primaryPalette(theme.colors.primary.name, theme.colors.primary.hues)
        .accentPalette(theme.colors.accent.name, theme.colors.accent.hues)
        .warnPalette(theme.colors.warn.name, theme.colors.warn.hues)
        .dark(theme.isDark);

      if (angular.isDefined(theme.colors.background)) {
        $mdThemingProvider
          .theme(theme.name)
          .backgroundPalette(theme.colors.background.name, theme.colors.background.hues);
      }
    }

    $mdThemingProvider.setDefaultTheme(self.elements.content);
  };
}

/* @ngInject */
export function addSkinToScope($rootScope, uicoreSkins) {
  $rootScope.uicoreSkin = uicoreSkins.getCurrent();
}
