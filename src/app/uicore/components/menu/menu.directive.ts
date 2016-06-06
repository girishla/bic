'use strict';


/* @ngInject */
export function uicoreMenuDirective($location, $mdTheming, uicoreTheming) {
  var directive = {
    restrict: 'E',
    template: '<md-content><uicore-menu-item permission permission-only="item.permission" ng-repeat="item in uicoreMenuController.menu | orderBy:\'priority\'" item="::item"></uicore-menu-item></md-content>',
    scope: {},
    controller: uicoreMenuController,
    controllerAs: 'uicoreMenuController',
    link: link
  };
  return directive;

  function link($scope, $element) {
    $mdTheming($element);
    var $mdTheme = $element.controller('mdTheme'); //eslint-disable-line

    var menuColor = uicoreTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
    var menuColorRGBA = uicoreTheming.rgba(menuColor.value);
    $element.css({'background-color': menuColorRGBA});
    $element.children('md-content').css({'background-color': menuColorRGBA});
  }
}

/* @ngInject */
export function uicoreMenuController(uicoreMenu) {
  var uicoreMenuController = this;
  // get the menu and order it
  uicoreMenuController.menu = uicoreMenu.menu;
}
