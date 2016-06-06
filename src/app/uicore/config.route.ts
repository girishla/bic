'use strict';


/* @ngInject */
export default    function routeConfig($stateProvider) {
  $stateProvider
    .state('elasticslice', {
      abstract: true,
      views: {
        'root': {
          templateUrl: 'app/uicore/layouts/states/uicore/uicore.tmpl.html',
          controller: 'uicoreStateController',
          controllerAs: 'stateController'
        },
        'sidebarLeft@elasticslice': {
          templateProvider: function ($templateRequest, uicoreLayout) {
            if (angular.isDefined(uicoreLayout.layout.sidebarLeftTemplateUrl)) {
              return $templateRequest(uicoreLayout.layout.sidebarLeftTemplateUrl);
            }
          },
          controllerProvider: function (uicoreLayout) {
            return uicoreLayout.layout.sidebarLeftController;
          },
          controllerAs: 'vm'
        },
        'sidebarRight@elasticslice': {
          templateProvider: function ($templateRequest, uicoreLayout) {
            if (angular.isDefined(uicoreLayout.layout.sidebarRightTemplateUrl)) {
              return $templateRequest(uicoreLayout.layout.sidebarRightTemplateUrl);
            }
          },
          controllerProvider: function (uicoreLayout) {
            return uicoreLayout.layout.sidebarRightController;
          },
          controllerAs: 'vm'
        },
        'toolbar@elasticslice': {
          templateProvider: function ($templateRequest, uicoreLayout) {
            if (angular.isDefined(uicoreLayout.layout.toolbarTemplateUrl)) {
              return $templateRequest(uicoreLayout.layout.toolbarTemplateUrl);
            }
          },
          controllerProvider: function (uicoreLayout) {
            return uicoreLayout.layout.toolbarController;
          },
          controllerAs: 'vm'
        },
        'loader@elasticslice': {
          templateProvider: function ($templateRequest, uicoreLayout) {
            if (angular.isDefined(uicoreLayout.layout.loaderTemplateUrl)) {
              return $templateRequest(uicoreLayout.layout.loaderTemplateUrl);
            }
          },
          controllerProvider: function (uicoreLayout) {
            return uicoreLayout.layout.loaderController;
          },
          controllerAs: 'loader'
        }
      }
    });
}
