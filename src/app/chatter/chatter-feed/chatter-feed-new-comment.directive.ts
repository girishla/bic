import * as _ from "lodash";

interface IChatterNewCommentDirectiveController {
  isActive: boolean;
  commentText: string;
  hasFocus: boolean;
  createComment(topicId: string, text: string): any

}


class ChatterNewCommentDirectiveController implements IChatterNewCommentDirectiveController {


  isActive: boolean;
  hasFocus: boolean;
  commentText: string;
  mentionedMatchedUsers;
  filteredUsers: {}[];

  static $inject = ['TopicService', 'UserService'];

  constructor(private TopicService: any, private UserService: any) {

    //TODO Do nothing at the moment. Will add more to this

    this.isActive = false;
    this.hasFocus = false;

  }

  getUsersextRaw = (item) => {
    return this.UserService.getUsersextRaw(item)
  };


  searchUsers = (term) => {
    return this.UserService.searchUsers(term).then((filteredUsers) => {
      this.filteredUsers = filteredUsers;

    })
  };

  createComment = (topicId: string, text: string) => {
    var newCommentPromise;
    let mentionedUsers;

    const mentionPattern = /\B@[a-z0-9_-]+/gi;

    mentionedUsers = text.match(mentionPattern);

    if (mentionedUsers) {
      mentionedUsers = mentionedUsers.map((mentionedUser) => {
        return { userAlias: mentionedUser.replace('@', '') }

      })

    } else {
      mentionedUsers = [];
    }


    this.UserService.getAll().then((users: any) => {

      //Add topic creator as follower by default
      mentionedUsers.push({ userAlias: 'admin' })

      //find user objects matching mentioned users. We need the user Ids to create followers
      this.mentionedMatchedUsers = _.intersectionBy(_.values(users), mentionedUsers, 'userAlias');

      //Keep only unique values
      this.mentionedMatchedUsers = _.uniqBy(this.mentionedMatchedUsers, 'userAlias');

      this.TopicService.createComment({ topicId: topicId }, { "text": text });

      angular.forEach(this.mentionedMatchedUsers, (matchedUser: any) => {

        this.TopicService.createFollower({ topicId: topicId }, { "userId": matchedUser.id });

      })

    })


    this.commentText = '';
    this.isActive = false;
    this.hasFocus = false;
    return newCommentPromise

  };















}


export default class ChatterNewCommentDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterNewCommentDirectiveController;
  controllerAs = 'chatterNewCommentCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed-new-comment.html';
  // scope = {

  //   feedMode: '='
  // };

  link = function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IChatterNewCommentDirectiveController) {

    scope.$watch(() => {
      return ctrl.commentText
    }, (oldvalue, newvalue) => {

      if (oldvalue != newvalue) {

        if (ctrl.commentText) {
          element.find('button[disabled]').eq(0).removeAttr('disabled');
        }
        else {
          element.find('button.slds-button--brand').attr('disabled', '');
        }

      }



    });


  };


  constructor(private TopicService: any) {

    console.log('in ChatterNewCommentDirective ')

  }


  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterNewCommentDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


