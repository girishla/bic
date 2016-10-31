import BIGateService from "./chatter-bigate.service";
import OBITableDirective from "./chatter-obi-table.directive";
import CellContext from "./chatter-cell-context.service";
import CellDirective from "./chatter-obi-table-cell.directive";
import CellPopoverDirective from "./chatter-cell-popover/chatter-cell-popover.directive";
import ChatterDialogController from "./chatter-cell-dialog/chatter-cell-dialog.controller";
import ChatterFeedDirective from "./chatter-feed/chatter-feed.directive";
import ChatterCommentDirective from "./chatter-feed/chatter-feed-comment.directive";
import ChatterCommentsDirective from "./chatter-feed/chatter-feed-comments.directive";
import ChatterNewCommentDirective from "./chatter-feed/chatter-feed-new-comment.directive";
import ChatterNewTopicDirective from "./chatter-feed/chatter-feed-new-topic.directive";
import ChatterTopicDirective from "./chatter-feed/chatter-feed-topic.directive";
import ChatterTopicsDirective from "./chatter-feed/chatter-feed-topics.directive";
import { TopicCommentApi, CommentApi } from "./chatter-feed/services/chatter-feed-comment-api.service";
import Socket from "./chatter-feed/services/chatter-feed-socket.service";
import TopicApi from "./chatter-feed/services/chatter-topic-api.service";
import TopicService from "./chatter-feed/services/chatter-feed-topic.service";
import ChatterConfig from "./chatter.config";
import ToArrayFilter from "./util/chatter-util-to-array.filter";
import { SidenavPushInDirective, ObiSideNavDirective } from "./chatter-side-nav/chatter-obi-sidenav.directive";
import ObiSideNavButtonDirective from "./chatter-side-nav/chatter-obi-sidenav-button.directive";
import AppUIStateFactory from "./chatter-app-state.service";
import * as popover from "angular-ui-bootstrap/src/popover"
import PopoverContent from "./util/chatter-popover-auto-close.directive"

export default angular
  .module('chatter.module', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngResource', 'btford.socket-io', popover])
  .config(ChatterConfig)
  .factory('BIGate', BIGateService)
  .factory('CellContext', CellContext)
  .directive("obiTable", ['BIGate', 'metaDataResponses', '$compile', 'CellContext', OBITableDirective])
  .directive('obiTableCell', ['$parse', '$compile', 'TopicService', CellDirective])
  .directive('obiTableCellPopover', ['$parse', '$compile', '$timeout', CellPopoverDirective])
  .controller('chatterDialogController', ['$mdDialog', '$sce', 'context', ChatterDialogController])
  .directive('chatterFeed', ChatterFeedDirective.factory())
  .directive('chatterComment', ChatterCommentDirective.factory())
  .directive('chatterComments', ChatterCommentsDirective.factory())
  .directive('chatterNewComment', ChatterNewCommentDirective.factory())
  .directive('chatterNewTopic', ChatterNewTopicDirective.factory())
  .directive('chatterTopic', ChatterTopicDirective.factory())
  .directive('chatterTopics', ChatterTopicsDirective.factory())
  .directive('sidenavPushIn', SidenavPushInDirective)
  .directive('obiSideNav', ObiSideNavDirective)
  //.directive('popoverAutoclose', PopoverContent)
  .factory('AppUIState', AppUIStateFactory)
  .directive('obiSideNavButton', ['AppUIState', ObiSideNavButtonDirective])
  .factory('CommentApi', CommentApi)
  .factory('TopicCommentApi', TopicCommentApi)
  .factory('Socket', Socket)
  .factory('TopicApi', TopicApi)
  .factory('TopicService', ['$rootScope', '$q', 'TopicApi', 'CommentApi', 'TopicCommentApi', 'Socket', TopicService])
  .filter('toArray', ToArrayFilter)


