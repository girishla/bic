'use strict'
/* @ngInject */
export default  function runFunction($rootScope, $timeout, $window) {
  // add a class to the body if we are on windows
  if ($window.navigator.platform.indexOf('Win') !== -1) {
    $rootScope.bodyClasses = ['os-windows'];
  }
};

