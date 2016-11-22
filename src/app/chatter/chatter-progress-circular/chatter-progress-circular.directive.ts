
interface IChatterProgressCircularDirectiveController {
    // specify exposed controller methods and properties here

    showProgress: Boolean;

}


class ChatterProgressCircularDirectiveController implements IChatterProgressCircularDirectiveController {

    public showProgress: Boolean = false;


    static $inject = ['$scope'];
    constructor(scope: ng.IScope) {
        //init controller

        scope.$on('eventProgressToggled', (event, payload) => {
            if (payload.showProgress==true) {
                console.log('setting showProgress to true');
                this.showProgress = true;
            }
            else {
                this.showProgress = false;
                console.log('setting showProgress to false');

            }
        })
    };

}



export default class ChatterProgressCircularDirective implements ng.IDirective {
    restrict = 'E';
    //require = 'ngModel';
    controller = ChatterProgressCircularDirectiveController;
    controllerAs = 'chatterProgressCircularCtrl';
    templateUrl = 'http://localhost:3000/app/chatter/chatter-progress-circular/chatter-progress-circular.html';


    constructor() {

        console.log('in ChatterProgressCircularDirective ')

    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new ChatterProgressCircularDirective();
        directive.$inject = [];
        return directive;
    }
}



