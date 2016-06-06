import {SortController} from "../controllers/SortController";

export class SortDirective {
  constructor() {
    var directive:ng.IDirective = {};
    directive.restrict = 'A';
    directive.scope = true;

    directive.controller = SortController;
    directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any, sortCtrl:any) {

/*
      scope.sortBy='Relevance'

      scope.sortField=function(){

        switch (scope.sortBy) {

          case 'Relevance':
            return;
          case 'Newest First':
            return 'surveyDate'
          case 'Account':
            return 'billingAccountId'
          case 'Product Family':
            return 'productFamily';
        }


      };
*/

      scope.$watch(element.attr('esl-sort') + " | eslCached", (val:any) => scope.sorting.sort = val);

      var enabled = false;
      var enabledAttr = element.attr('esl-enabled');

      if (enabledAttr) {
        scope.$watch(enabledAttr, (val:any) => scope.sorting.enabled = val);
        enabled = scope.$eval(enabledAttr);
      }

      scope.sorting = {
        sort: scope.$eval(element.attr('esl-sort') + " | eslCached"),
        enabled: enabled
      };

      sortCtrl.init();
    }
    return directive;
  }
}
