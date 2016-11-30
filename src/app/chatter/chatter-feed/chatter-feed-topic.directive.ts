

interface IChatterTopicDirectiveController {
  // specify exposed controller methods and properties here


}


class ChatterTopicDirectiveController implements IChatterTopicDirectiveController {

  topicData:any;
  mdDialogService:any;
  static $inject = ['TopicService','$mdDialog'];

  constructor(private TopicService:any,$mdDialog:any) {
  //TODO Do nothing at the moment. Will add more to this
  this.mdDialogService=$mdDialog;

  }


    showImageDialog = function (ev) {

        this.mdDialogService.show({
            controller: 'chatterFeedImageDialogController',
            controllerAs: 'imageDialogCtrl',
            bindToController: true,
            templateUrl: "http://localhost:3000/app/chatter/chatter-feed/chatter-feed-image-dialog/chatter-feed-image-dialog.html",
            parent: angular.element('.ComponentHeader'),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                dialogData: this.topicData,
            }
        })
            .then(function (answer) {
                //Do nothing
            }, function () {
               //Do nothing on cancel
            });
    };



   deleteFollower = (index)=> {
     this.TopicService.removeFollower(this.topicData.followers[index].id);
     return true;
   };


}


export default class ChatterTopicDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterTopicDirectiveController;
  controllerAs = 'chatterTopicCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed-topic.html';
  scope = {
    topicData: '=',
    feedMode:'='
  };
  bindToController = true;

  constructor(private TopicService:any) {

    console.log('in ChatterTopicDirective ')

  }

  static factory():ng.IDirectiveFactory {
    const directive = (TopicService:any) => new ChatterTopicDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


