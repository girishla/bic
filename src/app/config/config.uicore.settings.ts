/* @ngInject */
export default    function translateConfig(uicoreSettingsProvider, uicoreRouteProvider) {
  var now = new Date();
  // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
  uicoreSettingsProvider.setName('Proteus');
  uicoreSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' Lexis Nexis');
  uicoreSettingsProvider.setLogo('assets/images/logo.svg');
  // set current version of app (shown in footer)
  uicoreSettingsProvider.setVersion('0.0.1');
  // set the document title that appears on the browser tab
  uicoreRouteProvider.setTitle('Proteus');
  uicoreRouteProvider.setSeparator('|');
}
