    import {AggregationController} from "../controllers/AggregationController";

    export class AggregationDirective {
        constructor() {
            var directive: ng.IDirective = {};

            directive.restrict = 'EAC';
            directive.scope = true;

            directive.controller = AggregationController;
            directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs: any, aggCtrl:any) {
                scope.$watch(element.attr('esl-aggregation') + " | eslCached", (val:any) => scope.aggregation.agg = val);

                var filterSelf = true;
                var filterSelfAttr = element.attr('esl-filter-self');
                if (filterSelfAttr) {
                    scope.$watch(filterSelfAttr, (val:any) => scope.aggregation.filterSelf = val);
                    filterSelf = scope.$eval(filterSelfAttr);
                }

                scope.aggregation = {
                    agg: scope.$eval(element.attr('esl-aggregation') + " | eslCached"),
                    filterSelf: filterSelf
                };

                aggCtrl.init();
            }
            return directive;
        }
    }





