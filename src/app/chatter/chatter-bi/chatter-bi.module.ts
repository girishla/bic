import BIGateService from "./chatter-bigate.service";

export default angular
  .module('chatter-bi.module', [])
//   .config(ChatterConfig)
  .factory('BIGate', BIGateService)