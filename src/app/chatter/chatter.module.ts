// import OBITableDirective from "./chatter-obi-table.directive";
// import CellContext from "./chatter-cell-context.service";
// import CellDirective from "./chatter-obi-table-cell.directive";
// import CellPopoverDirective from "./chatter-cell-popover/chatter-cell-popover.directive";
import ChatterDialogController from "./chatter-cell-dialog/chatter-cell-dialog.controller";
import { TopicCommentApi, CommentApi } from "./chatter-feed/services/chatter-feed-comment-api.service";
import Socket from "./chatter-feed/services/chatter-feed-socket.service";
import TopicApi from "./chatter-feed/services/chatter-topic-api.service";
import TopicService from "./chatter-feed/services/chatter-feed-topic.service";
import ChatterConfig from "./chatter.config";
import ToArrayFilter from "./util/chatter-util-to-array.filter";
import { SidenavPushInDirective, ObiSideNavDirective } from "./chatter-side-nav/chatter-obi-sidenav.directive";
import ObiSideNavButtonDirective from "./chatter-side-nav/chatter-obi-sidenav-button.directive";
import AppUIStateService from "./chatter-app-state.service";
import "angular-ui-bootstrap/src/popover"
import ChatterFeedbackDirective from "./chatter-feedback/chatter-feedback.directive";
import "./chatter-bi/chatter-bi.module";
import "oclazyload/dist/ocLazyload.js";
import {MetadataService} from "./chatter-bi/chatter-bi-metadata.service"
import ChatterProgressCircularDirective from "./chatter-progress-circular/chatter-progress-circular.directive"
import "./chatter-declarations";
require("./chatter.scss");



export default angular
  .module('chatter.module', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngResource', 'btford.socket-io', 'ui.bootstrap.module.popover', 'angularMoment', 'chatter-bi.module'])
  .config(ChatterConfig)
  // .factory('CellContext', CellContext)
  // .directive("obiTable", ['BIGate', 'MetadataService', '$compile', OBITableDirective])
  // .directive('obiTableCell', ['$parse', '$compile', 'TopicService', CellDirective])
  // .directive('obiTableCellPopover', ['$parse', '$compile', '$timeout', CellPopoverDirective])
  .controller('chatterDialogController', ['$mdDialog', '$sce', 'context', ChatterDialogController])
  .directive('sidenavPushIn', SidenavPushInDirective)
  .directive('obiSideNav', ['$sce', ObiSideNavDirective])
  .service('AppUIState', AppUIStateService)
  .directive('obiSideNavButton', ['AppUIState', ObiSideNavButtonDirective])
  .directive('obiProgressCircular', ChatterProgressCircularDirective.factory())
  .factory('CommentApi', CommentApi)
  .factory('TopicCommentApi', TopicCommentApi)
  .factory('Socket', Socket)
  .factory('TopicApi', TopicApi)
  .factory('TopicService', ['$rootScope', '$q', 'TopicApi', 'CommentApi', 'TopicCommentApi', 'Socket', TopicService])
  .filter('toArray', ToArrayFilter)
  .directive('chatterFeedback', ['TopicApi', 'BIGate', ChatterFeedbackDirective])
  .service('MetadataService',MetadataService);


