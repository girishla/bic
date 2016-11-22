
interface IChatterProgressCircularDirectiveController {
    // specify exposed controller methods and properties here

    showProgress: Boolean;

}


class ChatterProgressCircularDirectiveController implements IChatterProgressCircularDirectiveController {

    public showProgress: Boolean = false;


    static $inject = ['$scope', '$mdDialog'];
    constructor(scope: ng.IScope, $mdDialog: any) {
        //init controller

        scope.$on('eventProgressToggled', (event, payload) => {
            if (payload.showProgress == true) {
                console.log('setting showProgress to true');
                $mdDialog.show({
                    controller: 'waitCtrl',
                    template: '<md-dialog style="min-height:10%">' + '<md-dialog-content class="md-padding">' +
                    '<div class="container" aria-label="wait">' +
                    '<md-progress-linear md-mode="query" ></md-progress-linear>' + '<div style="display: inline-block;margin-top: 10px;padding: 25px;"><span>Please wait. Loading chatter topics for this page...</span><div>' +
                    '</div>' + '</md-dialog-content>' +
                    '</md-dialog>',
                    parent: angular.element('.ComponentHeader'),
                    clickOutsideToClose: false,
                    fullscreen: false,
                    escapeToClose:false
                })
                    .then(function (answer) {

                    });

            }
            else {
                
                $mdDialog.cancel();

            }
        })
    };

}

//Empty Controller - required for material dialog to work quirk free
export class WaitCtrl {

    static $inject = ['$mdDialog', '$rootScope'];

    constructor($mdDialog, $rootScope) {


    }


}



export default class ChatterProgressCircularDirective implements ng.IDirective {
    restrict = 'E';
    //require = 'ngModel';
    controller = ChatterProgressCircularDirectiveController;
    controllerAs = 'chatterProgressCircularCtrl';
    //templateUrl = 'http://localhost:3000/app/chatter/chatter-progress-circular/chatter-progress-circular.html';


    constructor() {

        console.log('in ChatterProgressCircularDirective ')

    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new ChatterProgressCircularDirective();
        directive.$inject = [];
        return directive;
    }
}



