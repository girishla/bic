import {IndexController} from "../controllers/IndexController";
export class IndexDirective {
  constructor() {
    var directive:ng.IDirective = {};
    directive.restrict = 'EAC';
    directive.scope = false;

    directive.controller = IndexController;
    directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any, indexCtrl:IndexController) {
      scope.$watch(attrs.eslIndex, (val:any) => {
        indexCtrl.indexVM.index = val;
      });
      indexCtrl.indexVM.index = scope.$eval(attrs.eslIndex);
    }
    return directive;
  }
}

