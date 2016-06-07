/* @ngInject */
import IServiceProvider = angular.IServiceProvider;
export class layoutProvider implements IServiceProvider {

  getDefaultOption:(option:any)=>any;
  setDefaultOption:(option1:any,option2:any)=>any;
  $get:any;

  constructor(){

    var layoutDefaults = {
      toolbarSize: 'default',
      toolbarShrink: true,
      toolbarClass: '',
      contentClass: '',
      innerContentClass: '',
      sideMenuSize: 'full',
      showToolbar: true,
      showLeftSideNav:true,
      footer: true,
      contentTemplateUrl: 'app/uicore/layouts/default/default-content.tmpl.html',
      sidebarLeftTemplateUrl: 'app/uicore/components/menu/menu.tmpl.html',
      sidebarLeftController: 'MenuController',
      sidebarRightTemplateUrl: 'app/uicore/components/notifications-panel/notifications-panel.tmpl.html',
      sidebarRightController: 'NotificationsPanelController',
      toolbarTemplateUrl: 'app/uicore/components/toolbars/toolbar.tmpl.html',
      toolbarController: 'DefaultToolbarController',
      footerTemplateUrl: 'app/uicore/components/footer/footer.tmpl.html'
    };
    var resetableOptions = ['toolbarSize', 'toolbarShrink', 'toolbarClass', 'contentClass', 'innerContentClass', 'sideMenuSize', 'showToolbar','showLeftSideNav' ,'footer', 'contentTemplateUrl', 'sidebarLeftTemplateUrl', 'sidebarLeftController', 'sidebarRightTemplateUrl', 'sidebarRightController', 'toolbarTemplateUrl', 'toolbarController', 'footerTemplateUrl', 'loaderTemplateUrl', 'loaderController'];
    var layout = {};

    this.getDefaultOption = getDefaultOption;
    this.setDefaultOption = setDefaultOption;

    function getDefaultOption(name) {
      return layoutDefaults[name];
    }

    function setDefaultOption(name, value) {
      layoutDefaults[name] = value;
    }

    angular.extend(layout, layoutDefaults);


    // Service
    this.$get = function () {
      function setOption(name, value) {
        layout[name] = value;
      }

      function updateLayoutFromState(event, toState) {
        // reset classes
        angular.forEach(resetableOptions, function (option) {
          layout[option] = layoutDefaults[option];
        });
        var layoutOverrides = angular.isDefined(toState.data) && angular.isDefined(toState.data.layout) ? toState.data.layout : {};
        angular.extend(layout, layout, layoutOverrides);
      }

      return {
        layout: layout,
        setOption: setOption,
        updateLayoutFromState: updateLayoutFromState
      };
    };

  }


}





/* @ngInject */
export function layoutRunner($rootScope, uicoreLayout) {
  // check for $stateChangeStart and update the layouts if we have data.layout set
  // if nothing set reset to defaults for every state
  var destroyOn = $rootScope.$on('$stateChangeStart', uicoreLayout.updateLayoutFromState);
  $rootScope.$on('$destroy', removeWatch);

  /////////////

  function removeWatch() {
    destroyOn();
  }
}
