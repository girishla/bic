    export class InvertedDirective {
        constructor() {
            var directive: ng.IDirective = {};

            // http://stackoverflow.com/questions/13925462/angularjs-reverse-checkbox-state

            directive.require = 'ngModel';
            directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any, ngModel:any) {
                ngModel.$parsers.push(function (val:any) { return !val; });
                ngModel.$formatters.push(function (val:any) { return !val; });
            }
            return directive;
        }
    }

