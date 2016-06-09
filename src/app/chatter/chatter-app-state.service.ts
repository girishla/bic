define(["index.module"], function () {
  'use strict';


  angular
    .module('bm.platform')
    .factory('State', function () {

      var stateInstance = {

        sideNavOpened:false

      }
      return stateInstance; // jshint ignore:line
    })


});
