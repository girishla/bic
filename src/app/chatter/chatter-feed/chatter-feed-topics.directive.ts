
interface IChatterTopicsDirectiveController {
  // specify exposed controller methods and properties here
  //addTopic(): any;
}


class ChatterTopicsDirectiveController implements IChatterTopicsDirectiveController {

  topics:any;
  static $inject = ['TopicService'];
  constructor(private TopicService: any) {

    TopicService.getAll().then((data:any)=>{
      this.topics=data;
      console.log('logging from topics directive ctrller');
      console.log(Object.prototype.toString.call(data));
      console.log(data);

    });

  }

}



export default class ChatterTopicsDirective implements ng.IDirective {
  restrict = 'E';
  //require = 'ngModel';
  controller=ChatterTopicsDirectiveController;
  controllerAs='chatterTopicsCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-topics.html';


  constructor(private TopicService: any) {

    console.log('in ChatterTopicsDirective ')

  }

  static factory(): ng.IDirectiveFactory {
    const directive = (TopicService: any) => new ChatterTopicsDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


