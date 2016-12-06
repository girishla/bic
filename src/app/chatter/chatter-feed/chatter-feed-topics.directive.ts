var SHA1 = <any>require("crypto-js/sha1")


interface IChatterTopicsDirectiveController {
  // specify exposed controller methods and properties here
  //addTopic(): any;
}


class ChatterTopicsDirectiveController implements IChatterTopicsDirectiveController {

  topics: any;
  filtersHash: any;
  static $inject = ['TopicService', '$scope', 'BIGate'];
  constructor(private TopicService: any, private scope: ng.IScope, private BIGate) {

    TopicService.getAll().then((data: any) => {
      this.topics = data;

    });

    this.setfilters();

    this.scope.$on('rootEvent:refreshPrompts', (payload) => {

      this.setfilters();


    });
  }

  setfilters = () => {

    var filters = { filters: this.BIGate.instancePromptMap };
    this.filtersHash = filters ? SHA1(JSON.stringify(filters)).toString() : filters;

  }



}



export default class ChatterTopicsDirective implements ng.IDirective {
  restrict = 'E';
  //require = 'ngModel';
  controller = ChatterTopicsDirectiveController;
  controllerAs = 'chatterTopicsCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-feed-topics.html';

  constructor(private TopicService: any) {

    console.log('in ChatterTopicsDirective ')

  }

  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterTopicsDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


