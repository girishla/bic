    import {HostController} from "../controllers/HostController";
    export class URLDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'A';
            directive.scope = true;

            directive.controller = HostController;
            directive.link = function (scope:any, element:ng.IAugmentedJQuery, attrs: any, hostCtrl:any) {
                scope.$watch(element.attr('esl-host'), (val:any) => scope.host = val);

                scope.host = scope.$eval(element.attr('esl-host'));

                hostCtrl.init();
            }
            return directive;
        }
    }


