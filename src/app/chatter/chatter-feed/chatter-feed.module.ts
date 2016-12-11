import ChatterFeedImageDialogController from "./chatter-feed-image-dialog/chatter-feed-image-dialog.controller";
import ChatterFeedDirective from "./chatter-feed.directive";
import ChatterCommentDirective from "./chatter-feed-comment.directive";
import ChatterCommentsDirective from "./chatter-feed-comments.directive";
import ChatterNewCommentDirective from "./chatter-feed-new-comment.directive";
import ChatterNewTopicDirective from "./chatter-feed-new-topic.directive";
import ChatterTopicDirective from "./chatter-feed-topic.directive";
import ChatterTopicsDirective from "./chatter-feed-topics.directive";
import CellPopoverDirective from "../chatter-cell-popover/chatter-cell-popover.directive";
import ViewPopoverDirective from "../chatter-view-popover/chatter-view-popover.directive";
import OBITableDirective from "../chatter-obi-table.directive";
import OBIViewDirective from "../chatter-obi-view.directive";
import CellDirective from "../chatter-obi-table-cell.directive";
import ChatterFeedAutoGrow from "./chatter-feed-textarea-grow.directive"


require("./chatter-feed.scss")
require("salesforce-lightning-design-system-scoped/scss/index-vf.scss");
require("../chatter-feedback/chatter-feedback.styles.scss")
// require('ment.io')


require("mentio/mentio.directive.js")
require("mentio/mentio.service.js")
// require("angular-elastic/elastic.js");


export default () => {

    angular
        .module('chatter-feed.module', ['mentio'])
        .directive("obiView", ['BIGate', 'MetadataService', '$compile', OBIViewDirective])
        .directive("obiTable", ['BIGate', 'MetadataService', '$compile', OBITableDirective])
        .directive('obiTableCell', ['$parse', '$compile', 'TopicService', '$templateCache', CellDirective])
        .controller('chatterFeedImageDialogController', ['$mdDialog', 'dialogData', ChatterFeedImageDialogController])
        .directive('chatterFeed', ChatterFeedDirective.factory())
        .directive('chatterComment', ChatterCommentDirective.factory())
        .directive('chatterComments', ChatterCommentsDirective.factory())
        .directive('chatterNewComment', ChatterNewCommentDirective.factory())
        .directive('chatterNewTopic', ChatterNewTopicDirective.factory())
        .directive('chatterTopic', ChatterTopicDirective.factory())
        .directive('chatterTopics', ChatterTopicsDirective.factory())
        .directive('obiTableCellPopover', ['$parse', '$compile', '$timeout', 'TopicService', '$rootScope', CellPopoverDirective])
        .directive('obiTableViewPopover', ['$parse', '$compile', '$timeout', 'TopicService', '$rootScope', ViewPopoverDirective])
        .directive('autoGrow',ChatterFeedAutoGrow)
}

