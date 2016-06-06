import uicoreStateController from "./states/uicore/uicore.controller";
import uicoreDefaultContent from "./default/default-content.directive";
import DefaultLayoutController from "./default/default-layout.controller";

export default angular
  .module('uicore.layouts', [])
  .controller('uicoreStateController', uicoreStateController)
  .directive('uicoreDefaultContent', uicoreDefaultContent)
  .controller('DefaultLayoutController', DefaultLayoutController)
