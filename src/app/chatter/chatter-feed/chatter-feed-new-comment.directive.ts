

interface IChatterNewCommentDirectiveController {
  isActive:boolean;
  commentText:string;
  hasFocus:boolean;
  createComment(topicId:string, text:string):any

}


class ChatterNewCommentDirectiveController implements IChatterNewCommentDirectiveController {


  isActive:boolean;
  hasFocus:boolean;
  commentText:string;

  static $inject = ['TopicService'];

  constructor(private TopicService:any) {

    //TODO Do nothing at the moment. Will add more to this

    this.isActive = false;
    this.hasFocus = false;

  }

  createComment = (topicId:string, text:string)=> {
    var newComment = this.TopicService.createComment({topicId:topicId},{"text": text});
    this.commentText='';
    this.isActive = false;
    this.hasFocus = false;
    return newComment
  };


}


export default class ChatterNewCommentDirective implements ng.IDirective {
  restrict = 'E';
  controller = ChatterNewCommentDirectiveController;
  controllerAs = 'chatterNewCommentCtrl';
  templateUrl = 'http://localhost:3000/app/chatter/chatter-feed/chatter-new-comment.html';

  link = function (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes, ctrl:IChatterNewCommentDirectiveController) {

    scope.$watch(()=> {
      return ctrl.commentText
    }, (oldvalue,newvalue)=> {

      if(oldvalue!=newvalue){

        if (ctrl.commentText) {
          element.find('button[disabled]').eq(0).removeAttr('disabled');
        }
        else {
          element.find('button.slds-button--brand').attr('disabled', '');
        }

      }



    });


  };


  constructor(private TopicService:any) {

    console.log('in ChatterNewCommentDirective ')

  }


  static factory():ng.IDirectiveFactory {
    const directive = (TopicService:any) => new ChatterNewCommentDirective(TopicService);
    directive.$inject = ['TopicService'];
    return directive;
  }
}


