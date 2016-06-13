import BIGateService from "./chatter-bigate.service";
import OBITableDirective from "./chatter-obi-table.directive";
import CellContext from "./chatter-cell-context.service";
import CellDirective from "./chatter-obi-table-cell.directive";
import ChatterDialogController from "./chatter-cell-dialog/chatter-cell-dialog.controller";
import ChatterFeedDirective from "./chatter-feed/chatter-feed.directive";
import ChatterCommentDirective from "./chatter-feed/chatter-feed-comment.directive";
import ChatterCommentsDirective from "./chatter-feed/chatter-feed-comments.directive";
import ChatterNewCommentDirective from "./chatter-feed/chatter-feed-new-comment.directive";
import ChatterNewTopicDirective from "./chatter-feed/chatter-feed-new-topic.directive";
import ChatterTopicDirective from "./chatter-feed/chatter-feed-topic.directive";
import ChatterTopicsDirective from "./chatter-feed/chatter-feed-topics.directive";
import {TopicCommentApi, CommentApi} from "./chatter-feed/services/chatter-feed-comment-api.service";
import Socket from "./chatter-feed/services/chatter-feed-socket.service";
import TopicApi from "./chatter-feed/services/chatter-topic-api.service";
import TopicService from "./chatter-feed/services/chatter-feed-topic.service";
import ChatterConfig from "./chatter.config";
import ToArrayFilter from "./util/chatter-util-to-array.filter";


export default angular
  .module('chatter.module', ['ngAria', 'ngAnimate', 'ngMaterial','ngResource','btford.socket-io'])
  .config(ChatterConfig)
  .factory('BIGate', BIGateService)
  .factory('CellContext', CellContext)
  .directive("obiTable", ['BIGate', 'metaDataResponses', '$compile', 'CellContext', OBITableDirective])
  .directive('obiTableCell', ['$parse', CellDirective])
  .controller('chatterDialogController', ['$mdDialog', '$sce', 'context', ChatterDialogController])
  .directive('chatterFeed', ChatterFeedDirective.factory())
  .directive('chatterComment', ChatterCommentDirective.factory())
  .directive('chatterComments', ChatterCommentsDirective.factory())
  .directive('chatterNewComment', ChatterNewCommentDirective.factory())
  .directive('chatterNewTopic', ChatterNewTopicDirective.factory())
  .directive('chatterTopic', ChatterTopicDirective.factory())
  .directive('chatterTopics', ChatterTopicsDirective.factory())
  .factory('CommentApi', CommentApi)
  .factory('TopicCommentApi', TopicCommentApi)
  .factory('Socket',Socket)
  .factory('TopicApi',TopicApi)
  .factory('TopicService', ['$rootScope', '$q', 'TopicApi', 'CommentApi','TopicCommentApi', 'Socket',TopicService])
  .filter('toArray',ToArrayFilter)











