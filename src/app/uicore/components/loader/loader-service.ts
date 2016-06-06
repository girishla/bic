'use strict';


/* @ngInject */
export default    function LoaderService($rootScope) {
  var active = false;

  return {
    isActive: isActive,
    setLoaderActive: setLoaderActive
  };

  ////////////////

  function isActive() {
    return active;
  }

  function setLoaderActive(setActive) {
    active = setActive;
    $rootScope.$broadcast('loader', active);
  }
}
