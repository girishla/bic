/* @ngInject */
export default    function themesConfig($mdThemingProvider, uicoreThemingProvider, uicoreSkinsProvider) {
  /**
   *  PALETTES
   */
  $mdThemingProvider.definePalette('white', {
    '50': 'ffffff',
    '100': 'ffffff',
    '200': 'ffffff',
    '300': 'ffffff',
    '400': 'ffffff',
    '500': 'ffffff',
    '600': 'ffffff',
    '700': 'ffffff',
    '800': 'ffffff',
    '900': 'ffffff',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'dark'
  });

  $mdThemingProvider.definePalette('black', {
    '50': 'e1e1e1',
    '100': 'b6b6b6',
    '200': '8c8c8c',
    '300': '646464',
    '400': '3a3a3a',
    '500': 'e1e1e1',
    '600': 'e1e1e1',
    '700': '232323',
    '800': '1a1a1a',
    '900': '121212',
    'A100': '3a3a3a',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'light'
  });

  var uicoreCyanMap = $mdThemingProvider.extendPalette('cyan', {
    'contrastDefaultColor': 'light',
    'contrastLightColors': '500 700 800 900',
    'contrastStrongLightColors': '500 700 800 900'
  });

  // Register the new color palette map with the name uicoreCyan
  $mdThemingProvider.definePalette('uicoreCyan', uicoreCyanMap);

  /**
   *  SKINS
   */

  // CYAN CLOUD SKIN
  uicoreThemingProvider.theme('cyan')
    .primaryPalette('uicoreCyan')
    .accentPalette('amber')
    .warnPalette('deep-orange');

  uicoreThemingProvider.theme('default')
    .primaryPalette('white')
    .accentPalette('uicoreCyan', {
      'default': '500'
    })
    .warnPalette('deep-orange');

  uicoreSkinsProvider.skin('cyan-cloud', 'Cyan Cloud')
    .sidebarTheme('cyan')
    .toolbarTheme('default')
    .logoTheme('cyan')
    .contentTheme('cyan');

  // RED DWARF SKIN
  uicoreThemingProvider.theme('red')
    .primaryPalette('red')
    .accentPalette('amber')
    .warnPalette('purple');

  uicoreThemingProvider.theme('white-red')
    .primaryPalette('white')
    .accentPalette('red', {
      'default': '500'
    })
    .warnPalette('purple');

  uicoreSkinsProvider.skin('red-dwarf', 'Red Dwarf')
    .sidebarTheme('red')
    .toolbarTheme('white-red')
    .logoTheme('red')
    .contentTheme('red');

  // PLUMB PURPLE SKIN
  uicoreThemingProvider.theme('purple')
    .primaryPalette('purple')
    .accentPalette('deep-orange')
    .warnPalette('amber');

  uicoreThemingProvider.theme('white-purple')
    .primaryPalette('white')
    .accentPalette('purple', {
      'default': '400'
    })
    .warnPalette('deep-orange');

  uicoreSkinsProvider.skin('plumb-purple', 'Plumb Purple')
    .sidebarTheme('purple')
    .toolbarTheme('white-purple')
    .logoTheme('purple')
    .contentTheme('purple');

  // DARK KNIGHT SKIN
  uicoreThemingProvider.theme('dark')
    .primaryPalette('black', {
      'default': '300',
      'hue-1': '400'
    })
    .accentPalette('amber')
    .warnPalette('deep-orange')
    .backgroundPalette('black')
    .dark();

  uicoreSkinsProvider.skin('dark-knight', 'Dark Knight')
    .sidebarTheme('dark')
    .toolbarTheme('dark')
    .logoTheme('dark')
    .contentTheme('dark');

  // BATTLESHIP GREY SKIN
  uicoreThemingProvider.theme('blue-grey')
    .primaryPalette('blue-grey')
    .accentPalette('amber')
    .warnPalette('orange');


  uicoreThemingProvider.theme('white-blue-grey')
    .primaryPalette('white')
    .accentPalette('blue-grey', {
      'default': '400'
    })
    .warnPalette('orange');

  uicoreSkinsProvider.skin('battleship-grey', 'Battleship Grey')
    .sidebarTheme('blue-grey')
    .toolbarTheme('white-blue-grey')
    .logoTheme('blue-grey')
    .contentTheme('blue-grey');

  // ZESTY ORANGE SKIN
  uicoreThemingProvider.theme('orange')
    .primaryPalette('orange', {
      'default': '800'
    })
    .accentPalette('lime')
    .warnPalette('amber');

  uicoreThemingProvider.theme('white-orange')
    .primaryPalette('white')
    .accentPalette('orange', {
      'default': '500'
    })
    .warnPalette('lime');

  uicoreSkinsProvider.skin('zesty-orange', 'Zesty Orange')
    .sidebarTheme('orange')
    .toolbarTheme('white-orange')
    .logoTheme('orange')
    .contentTheme('orange');


  // INDIGO ISLAND SKIN
  uicoreThemingProvider.theme('indigo')
    .primaryPalette('indigo', {
      'default': '600'
    })
    .accentPalette('red')
    .warnPalette('lime');

  uicoreSkinsProvider.skin('indigo-island', 'Indigo Island')
    .sidebarTheme('indigo')
    .toolbarTheme('indigo')
    .logoTheme('indigo')
    .contentTheme('indigo');

  // KERMIT GREEN SKIN
  uicoreThemingProvider.theme('light-green')
    .primaryPalette('light-green', {
      'default': '400'
    })
    .accentPalette('amber')
    .warnPalette('deep-orange');

  uicoreThemingProvider.theme('white-light-green')
    .primaryPalette('white')
    .accentPalette('light-green', {
      'default': '400'
    })
    .warnPalette('deep-orange');

  uicoreSkinsProvider.skin('kermit-green', 'Kermit Green')
    .sidebarTheme('light-green')
    .toolbarTheme('white-light-green')
    .logoTheme('light-green')
    .contentTheme('light-green');



  uicoreThemingProvider.theme('proteus-grey')
    .primaryPalette('grey',{
      'default': '700'
    })
    .accentPalette('amber')
    .warnPalette('orange');


  uicoreThemingProvider.theme('proteus-red')
    .primaryPalette('red',{
      'default': '700'
    })
    .accentPalette('amber')
    .warnPalette('purple');



  uicoreSkinsProvider.skin('proteus', 'Proteus')
    .sidebarTheme('proteus-red')
    .toolbarTheme('default')
    .logoTheme('proteus-grey')
    .contentTheme('proteus-grey');


//  uicoreSkinsProvider.useSkinCookie(true);


  /**
   *  SET DEFAULT SKIN
   */
  uicoreSkinsProvider.setSkin('proteus');
}
