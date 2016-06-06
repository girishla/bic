import {HighlightController} from "../controllers/HighlightController";

export class HighlightDirective {
  constructor() {
    var directive:ng.IDirective = {};
    directive.restrict = 'A';
    directive.scope = true;

    directive.controller = HighlightController;
    directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any, highlightCtrl:any) {
      scope.$watch(element.attr('esl-highlight') + " | eslCached", (val:any) => scope.highlighting.highlight = val);

      var enabled = false;
      var enabledAttr = element.attr('esl-enabled');
      if (enabledAttr) {
        scope.$watch(enabledAttr, (val:any) => scope.highlighting.enabled = val);
        enabled = scope.$eval(enabledAttr);
      }

      scope.highlighting = {
        highlight: scope.$eval(element.attr('esl-highlight') + " | eslCached"),
        enabled: enabled
      };
      highlightCtrl.init();
    }
    return directive;
  }
}

