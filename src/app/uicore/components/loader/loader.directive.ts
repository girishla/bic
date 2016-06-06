
/* @ngInject */
export default function uicoreLoader() {
  var directive = {
    bindToController: true,
    controller: uicoreLoaderController,
    controllerAs: 'vm',
    template: '<div flex class="loader padding-100" ng-show="vm.isActive()" layout="column" layout-fill layout-align="center center"><h3 class="md-headline">{{vm.uicoreSettings.name}}</h3><md-progress-linear md-mode="indeterminate"></md-progress-linear></div>',
    restrict: 'E',
    replace: true,
    scope: {}
  };
  return directive;
}

/* @ngInject */
function uicoreLoaderController($rootScope, uicoreLoaderService , uicoreSettings) {
  var vm = this;
  vm.uicoreSettings = uicoreSettings;
  vm.isActive = uicoreLoaderService .isActive;
}
