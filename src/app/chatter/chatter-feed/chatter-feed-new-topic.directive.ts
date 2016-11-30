import * as _ from "lodash"


interface IChatterNewTopicDirectiveController {
  isActive: boolean;
  topicText: string;
  hasFocus: boolean;
  createTopic(text: any): any

}


class ChatterNewTopicDirectiveController implements IChatterNewTopicDirectiveController {


  isActive: boolean;
  hasFocus: boolean;
  topicText: string;
  feedContext: any;
  sidenavService: any;
  uistateService: any;
  filteredUsers: {}[];
  typedTerm: string = '';
  mode: string = '';
  mentionedMatchedUsers = [];

  static $inject = ['TopicService', '$mdSidenav', 'AppUIState', 'UserService', '$q', 'TopicService'];

  constructor(private TopicService: any, Sidenav: any, AppUIState: any, private UserService: any, private $q: ng.IQService) {

    this.isActive = false;
    this.hasFocus = false;
    this.sidenavService = Sidenav;
    this.uistateService = AppUIState;

  }

  createTopic = (text: any) => {
    var newTopicPromise;

    const mentionPattern = /\B@[a-z0-9_-]+/gi;

    let mentionedUsers = text.match(mentionPattern);

    if (mentionedUsers) {
      mentionedUsers = mentionedUsers.map((mentionedUser) => {
        return { userAlias: mentionedUser.replace('@', '') }

      })

    }



    this.UserService.getAll().then((users: any) => {

      //Add topic creator as follower by default
      mentionedUsers.push({ userAlias: 'admin' })

      //find user objects matching mentioned users. We need the user Ids to create followers
      this.mentionedMatchedUsers = _.intersectionBy(_.values(users), mentionedUsers, 'userAlias');

      //Keep only unique values
      this.mentionedMatchedUsers = _.uniqBy(this.mentionedMatchedUsers, 'userAlias');

      console.log('mentionedMatchedUsers', this.mentionedMatchedUsers)

      newTopicPromise = this.TopicService.create(
        {
          "text": text,
          "level1Context": this.feedContext.level1Context,
          "level2Context": this.feedContext.level2Context,
          "level3Context": this.feedContext.level3Context,
          "level4Context": this.feedContext.level4Context,
          "level1ContextHash": this.feedContext.level1ContextHash,
          "level2ContextHash": this.feedContext.level2ContextHash,
          "level3ContextHash": this.feedContext.level3ContextHash,
          "level4ContextHash": this.feedContext.level4ContextHash

        }
      );

      angular.forEach(this.mentionedMatchedUsers, (matchedUser: any) => {
        newTopicPromise.then((topic: any) => {
          this.TopicService.createFollower({ topicId: topic.id }, { "userId": matchedUser.id });

        })

      })

      // //Topic creator is a follower by default
      // newTopicPromise.then((topic: any) => {
      //   this.TopicService.createFollower({ topicId: topic.id }, { "userId": 1 });
      // })


    })




    this.topicText = '';
    this.isActive = false;
    this.hasFocus = false;



    return newTopicPromise;
  };


  getUsersextRaw = (item) => {
    return this.UserService.getUsersextRaw(item)
  };


  searchUsers = (term) => {

    return this.UserService.searchUsers(term).then((filteredUsers)=>{
      this.filteredUsers=filteredUsers;

    })

  };

  close = function () {
    this.sidenavService('right').close()
      .then(function () {
        //this.uistateService.sideNavOpened = false;
      });
  };

}


export default class ChatterNewTopicDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterNewTopicDirectiveController;
  controllerAs = 'chatterNewTopicCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed-new-topic.html';
  scope = {
    feedContext: '=',
    feedMode: '='
  };
  bindToController = true;




  link = function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: IChatterNewTopicDirectiveController) {


    scope.$watch(() => {
      return ctrl.topicText
    }, (oldvalue, newvalue) => {

      if (oldvalue != newvalue) {

        if (ctrl.topicText) {
          element.find('button[disabled]').eq(0).removeAttr('disabled');
        }
        else {
          element.find('button.slds-button--brand').attr('disabled', '');
        }
      }
    });

  };


  constructor(private TopicService: any) {
    console.log('in ChatterNewTopicDirective ')

  }


  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterNewTopicDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


