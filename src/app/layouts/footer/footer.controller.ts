/* @ngInject */
export default    function AppFooterController(uicoreLayout, uicoreSettings) {
  var vm = this;

  vm.layout = uicoreLayout;
  vm.settings = uicoreSettings;
}

