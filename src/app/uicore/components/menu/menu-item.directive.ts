'use strict';


/* @ngInject */
export function uicoreMenuItemDirective() {
  var directive = {
    restrict: 'E',
    require: '^uicoreMenu',
    scope: {
      item: '='
    },
    // replace: true,
    template: '<div style="overflow:hidden" ng-include="::uicoreMenuItem.item.template"></div>',
    controller: uicoreMenuItemController,
    controllerAs: 'uicoreMenuItem',
    bindToController: true
  };
  return directive;
}

/* @ngInject */
export function uicoreMenuItemController($scope, $mdSidenav, $state, $filter, uicoreBreadcrumbsService) {
  var uicoreMenuItem = this;
  // load a template for this directive based on the type ( link | dropdown )
  uicoreMenuItem.item.template = 'app/uicore/components/menu/menu-item-' + uicoreMenuItem.item.type + '.tmpl.html';

  switch (uicoreMenuItem.item.type) {
    case 'dropdown':
      // if we have kids reorder them by priority
      uicoreMenuItem.item.children = $filter('orderBy')(uicoreMenuItem.item.children, 'priority');
      uicoreMenuItem.toggleDropdownMenu = toggleDropdownMenu;
      // add a check for open event
      $scope.$on('toggleDropdownMenu', function (event, item, open) {
        // if this is the item we are looking for
        if (uicoreMenuItem.item === item) {
          uicoreMenuItem.item.open = open;
        }
        else {
          uicoreMenuItem.item.open = false;
        }
      });
      // this event is emitted up the tree to open parent menus
      $scope.$on('openParents', function () {
        // openParents event so open the parent item
        uicoreMenuItem.item.open = true;
        // also add this to the breadcrumbs
        uicoreBreadcrumbsService.addCrumb(uicoreMenuItem.item);
      });
      break;
    case 'link':
      uicoreMenuItem.openLink = openLink;

      // on init check if this is current menu
      checkItemActive($state.current.name, $state.params);

      $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
        checkItemActive(toState.name, toParams);
      });
      break;
  }

  function checkItemActive(param1?,param2?) {
    // first check if the state is the same
    uicoreMenuItem.item.active = $state.includes(uicoreMenuItem.item.state, uicoreMenuItem.item.params);
    // if we are now the active item reset the breadcrumbs and open all parent dropdown items
    if (uicoreMenuItem.item.active) {
      uicoreBreadcrumbsService.reset();
      uicoreBreadcrumbsService.addCrumb(uicoreMenuItem.item);
      $scope.$emit('openParents');
    }
  }

  function toggleDropdownMenu() {
    $scope.$parent.$parent.$broadcast('toggleDropdownMenu', uicoreMenuItem.item, !uicoreMenuItem.item.open);
  }

  function openLink() {
    var params = angular.isUndefined(uicoreMenuItem.item.params) ? {} : uicoreMenuItem.item.params;
    $state.go(uicoreMenuItem.item.state, params);
    uicoreMenuItem.item.active = true;
    $mdSidenav('left').close();
  }
}
