import {FilterController} from "../controllers/FilterController";

export class FilterDirective {
  constructor() {
    var directive:ng.IDirective = {};
    directive.restrict = 'A';
    directive.scope = true;
    directive.controller = FilterController;
    directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any, filterCtrl:any) {
      scope.$watch(element.attr('esl-filter') + " | eslCached", (val:any) => {
        scope.filter.filter = val
      });

      var enabled = false;
      var enabledAttr = element.attr('esl-enabled');
      if (enabledAttr) {
        scope.$watch(enabledAttr, (val:any) => {
          scope.filter.enabled = val
        });
        enabled = scope.$eval(enabledAttr);

      }

      scope.filter = {
        filter: scope.$eval(element.attr('esl-filter') + " | eslCached"),
        enabled: enabled
      };

      filterCtrl.init();
    }
    return directive;
  }
}


