
import ChatterDialogController from "./chatter-cell-dialog/chatter-cell-dialog.controller";
import { TopicCommentApi, CommentApi } from "./chatter-feed/services/chatter-feed-comment-api.service";
import { TopicFollowerApi, FollowerApi } from "./chatter-feed/services/chatter-feed-topic-follower-api.service";
import Socket from "./chatter-feed/services/chatter-feed-socket.service";
import TopicApi from "./chatter-feed/services/chatter-topic-api.service";
import UserApi from "./chatter-feed/services/chatter-user-api.service";
import TopicService from "./chatter-feed/services/chatter-feed-topic.service";
import UserService from "./chatter-feed/services/chatter-user.service";
import ChatterConfig from "./chatter.config";
import ToArrayFilter from "./util/chatter-util-to-array.filter";
import { SidenavPushInDirective, ObiSideNavDirective } from "./chatter-side-nav/chatter-obi-sidenav.directive";
import ObiSideNavButtonDirective from "./chatter-side-nav/chatter-obi-sidenav-button.directive";
import AppUIStateService from "./chatter-app-state.service";
import "angular-ui-bootstrap/src/popover"
import ChatterFeedbackDirective from "./chatter-feedback/chatter-feedback.directive";
import "./chatter-bi/chatter-bi.module";
import "oclazyload/dist/ocLazyload.js";
import "ns-popover/src/nsPopover.js"


import {MetadataService} from "./chatter-bi/chatter-bi-metadata.service"
import ChatterProgressCircularDirective from "./chatter-progress-circular/chatter-progress-circular.directive"
import WaitCtrl from "./chatter-progress-circular/chatter-progress-circular.directive"


import "./chatter-declarations";
require("./chatter.scss");
// require("./chatter-feed/chatter-feed-followers-popover.html");


export default angular
  .module('chatter.module', ['ngAria', 'ngAnimate', 'ngMaterial', 'ngResource', 'btford.socket-io', 'ui.bootstrap.module.popover', 'angularMoment', 'chatter-bi.module','nsPopover'])
  .config(ChatterConfig)
  .controller('chatterDialogController', ['$mdDialog', '$sce', 'context', ChatterDialogController])
  .controller('waitCtrl', ['$mdDialog','$rootScope', WaitCtrl])
 
  .directive('sidenavPushIn', SidenavPushInDirective)
  .directive('obiSideNav', ['$sce', ObiSideNavDirective])
  .service('AppUIState', AppUIStateService)
  .directive('obiSideNavButton', ['AppUIState', ObiSideNavButtonDirective])
  .directive('obiProgressCircular', ChatterProgressCircularDirective.factory())
  .factory('CommentApi', CommentApi)
  .factory('TopicCommentApi', TopicCommentApi)
  .factory('FollowerApi', FollowerApi)
  .factory('TopicFollowerApi', TopicFollowerApi)
  .factory('Socket', Socket)
  .factory('TopicApi', TopicApi)
  .factory('UserApi', UserApi)
  .factory('TopicService', ['$rootScope', '$q', 'TopicApi', 'CommentApi', 'TopicCommentApi', 'Socket','FollowerApi','TopicFollowerApi','UserService', TopicService])
  .factory('UserService', ['$q', 'UserApi', 'Socket', UserService])
  .filter('toArray', ToArrayFilter)
  .directive('chatterFeedback', ['TopicApi', 'BIGate', ChatterFeedbackDirective])
  .service('MetadataService',MetadataService)
  .run(function(UserService){
    UserService.getAll().then((data:any)=>{
      //Users Cached in Service. Nothing more to be done for now.

    });

  })


