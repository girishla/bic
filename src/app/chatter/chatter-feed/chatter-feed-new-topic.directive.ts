

interface IChatterNewTopicDirectiveController {
  isActive:boolean;
  topicText:string;
  hasFocus:boolean;
  createTopic(text:any):any

}


class ChatterNewTopicDirectiveController implements IChatterNewTopicDirectiveController {


  isActive:boolean;
  hasFocus:boolean;
  topicText:string;
  feedContext:any;

  static $inject = ['TopicService'];

  constructor(private TopicService:any) {

    //TODO Do nothing at the moment. Will add more to this

    this.isActive = false;
    this.hasFocus = false;

  }

  createTopic = (text:any)=> {
    var newTopic = this.TopicService.create(
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
    this.topicText = '';
    this.isActive = false;
    this.hasFocus = false;
    return newTopic;
  };

}


export default class ChatterNewTopicDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterNewTopicDirectiveController;
  controllerAs = 'chatterNewTopicCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed-new-topic.html';
  scope = {
    feedContext: '='
  };
  bindToController = true;

  link = function (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes, ctrl:IChatterNewTopicDirectiveController) {


    scope.$watch(()=> {
      return ctrl.topicText
    }, (oldvalue, newvalue)=> {

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


  constructor(private TopicService:any) {
    console.log('in ChatterNewTopicDirective ')

  }


  static factory():ng.IDirectiveFactory {
    const directive = (TopicService:any) => new ChatterNewTopicDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


