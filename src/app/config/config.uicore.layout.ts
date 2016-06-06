/* @ngInject */
export default    function configLayout(uicoreLayoutProvider) {
  // set app templates (all in app/layouts folder so you can tailor them to your needs)


  // loader screen HTML & controller
  uicoreLayoutProvider.setDefaultOption('loaderTemplateUrl', 'app/layouts/loader/loader.tmpl.html');
  uicoreLayoutProvider.setDefaultOption('loaderController', 'AppLoaderController');

  // left sidemenu HTML and controller
  uicoreLayoutProvider.setDefaultOption('sidebarLeftTemplateUrl', 'app/uicore/components/leftsidenav/leftsidenav.tmpl.html');
  uicoreLayoutProvider.setDefaultOption('sidebarLeftController', 'LeftSidenavController');

  // right sidemenu HTML and controller
  uicoreLayoutProvider.setDefaultOption('sidebarRightTemplateUrl', 'app/uicore/components/rightsidenav/rightsidenav.tmpl.html');
  uicoreLayoutProvider.setDefaultOption('sidebarRightController', 'RightSidenavController');

  // top toolbar HTML and controller
  uicoreLayoutProvider.setDefaultOption('toolbarTemplateUrl', 'app/uicore/components/toolbars/toolbar.tmpl.html');
  uicoreLayoutProvider.setDefaultOption('toolbarController', 'DefaultToolbarController');


  // footer HTML
  uicoreLayoutProvider.setDefaultOption('footerTemplateUrl', 'app/layouts/footer/footer.tmpl.html');
  /*uicoreLayoutProvider.setDefaultOption('footerController', 'FooterController');*/


  uicoreLayoutProvider.setDefaultOption('toolbarSize', 'default');

  uicoreLayoutProvider.setDefaultOption('toolbarShrink', false);

  uicoreLayoutProvider.setDefaultOption('toolbarClass', '');

  uicoreLayoutProvider.setDefaultOption('contentClass', '');

  uicoreLayoutProvider.setDefaultOption('sideMenuSize', 'full');

  uicoreLayoutProvider.setDefaultOption('showToolbar', true);

  uicoreLayoutProvider.setDefaultOption('showLeftSideNav', true);

  uicoreLayoutProvider.setDefaultOption('footer', true);
}
