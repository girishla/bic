
export default class AppUIStateService {

  public sideNavOpened: Boolean = false;
  private showProgress: Boolean = false;

  static $inject = ['$rootScope']

  constructor(public $rootScope: ng.IScope) {


  }

  progressOn = (rootscope: ng.IScope) => {

    this.$rootScope.$broadcast("eventProgressToggled", { showProgress: true });

  }

  progressOff = (rootscope: ng.IScope) => {

    this.$rootScope.$broadcast("eventProgressToggled", { showProgress: false });

  }

}