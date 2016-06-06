'use strict';

/* @ngInject */
export function FooterController(uicoreSettings, uicoreLayout) {
  var vm = this;
  vm.name = uicoreSettings.name;
  vm.copyright = uicoreSettings.copyright;
  vm.layout = uicoreLayout.layout;
  vm.version = uicoreSettings.version;
}

