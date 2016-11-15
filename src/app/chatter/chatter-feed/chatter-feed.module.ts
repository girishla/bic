import ChatterFeedImageDialogController from "./chatter-feed-image-dialog/chatter-feed-image-dialog.controller";
import ChatterFeedDirective from "./chatter-feed.directive";
import ChatterCommentDirective from "./chatter-feed-comment.directive";
import ChatterCommentsDirective from "./chatter-feed-comments.directive";
import ChatterNewCommentDirective from "./chatter-feed-new-comment.directive";
import ChatterNewTopicDirective from "./chatter-feed-new-topic.directive";
import ChatterTopicDirective from "./chatter-feed-topic.directive";
import ChatterTopicsDirective from "./chatter-feed-topics.directive";
require("./chatter-feed.scss")
require("salesforce-lightning-design-system-scoped/scss/index-vf.scss");
require("../chatter-feedback/chatter-feedback.styles.scss")

export default () => {

    angular
        .module('chatter-feed.module', [])
        .controller('chatterFeedImageDialogController', ['$mdDialog', 'dialogData', ChatterFeedImageDialogController])
        .directive('chatterFeed', ChatterFeedDirective.factory())
        .directive('chatterComment', ChatterCommentDirective.factory())
        .directive('chatterComments', ChatterCommentsDirective.factory())
        .directive('chatterNewComment', ChatterNewCommentDirective.factory())
        .directive('chatterNewTopic', ChatterNewTopicDirective.factory())
        .directive('chatterTopic', ChatterTopicDirective.factory())
        .directive('chatterTopics', ChatterTopicsDirective.factory())

}

