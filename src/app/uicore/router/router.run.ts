'use strict';

/* @ngInject */
export default    function runFunctionRouter($rootScope, $window, $state, $filter, $timeout, uicoreRoute, uicoreBreadcrumbsService) {
  var breadcrumbs = uicoreBreadcrumbsService.breadcrumbs;

  // change title when language changes - when a menu item is clicked - on app init
  var menuTitleHandler = $rootScope.$on('changeTitle', function () {
    setFullTitle();
  });

  $rootScope.$on('$destroy', function () {
    menuTitleHandler();
  });

  function setFullTitle() {
    $timeout(function () {
      var title = uicoreRoute.title;
      angular.forEach(breadcrumbs.crumbs, function (crumb) {
        title += ' ' + uicoreRoute.separator + ' ' + crumb.name;
      });
      $window.document.title = title;
    });
  }
}
