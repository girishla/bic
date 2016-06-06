// The widgets show how to create reusable components on top of elasticslice.
// You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
import {AngularTool} from "../../util/AngularTool";
import {SearchBoxController} from "./SearchBoxController";

export class SearchboxDirective {
  static $inject = ['$parse'];

  constructor($parse:ng.IParseService) {

    var directive:ng.IDirective = {};
    directive.restrict = 'E';

    directive.scope = true;

    directive.controller=SearchBoxController;
    directive.controllerAs= "ctrl";

    (<any>directive).link = {
      'pre': function (scope:any, element:ng.IAugmentedJQuery, attrs:any) {
        AngularTool.setupBinding($parse, scope, attrs, ["field"]);
      }
    }

    // TODO: should be debounced
    /*directive.template = '\
            <input type="text" esl-query="ejs.MatchQuery(field, querystring)" ng-model="querystring" esl-enabled="querystring.length" />\
            ';
*/
    directive.templateUrl ='app/widgets/directives/SearchboxDirective.html';


    return directive;
  }
}


