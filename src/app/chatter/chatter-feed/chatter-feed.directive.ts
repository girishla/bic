 var SHA1 = require("crypto-js/sha1")

// declare var SHA1: any;

interface IChatterFeedDirectiveController {
  // specify exposed controller methods and properties here

  feedContext:any

}

class ChatterFeedDirectiveController implements IChatterFeedDirectiveController {


  feedContext:any;



  topics:any;
  static $inject = ['TopicService'];
  constructor(private TopicService: any) {

    //apply a sha1 hash to all contexts
    this.feedContext.level1ContextHash=this.feedContext.level1Context?SHA1(JSON.stringify(this.feedContext.level1Context)).toString():this.feedContext.level1Context;
    this.feedContext.level2ContextHash=this.feedContext.level2Context?SHA1(JSON.stringify(this.feedContext.level2Context)).toString():this.feedContext.level2Context;
    this.feedContext.level3ContextHash=this.feedContext.level3Context?SHA1(JSON.stringify(this.feedContext.level3Context)).toString():this.feedContext.level3Context;
    this.feedContext.level4ContextHash=this.feedContext.level4Context?SHA1(JSON.stringify(this.feedContext.level4Context)).toString():this.feedContext.level4Context;


  }


}


export default class ChatterFeedDirective implements ng.IDirective {
  restrict = 'E';
  controller=ChatterFeedDirectiveController;
  controllerAs='chatterFeedCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed.html';

  scope = {
    feedContext:'='
  };
  bindToController = true;


  constructor(private TopicService: any) {



  }


  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterFeedDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}



