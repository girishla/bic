
export default function ObiSideNavButtonDirective(AppUIState) {

  var controller = ['$scope', 'AppUIState', function ($scope, AppUIState) {


      var vm = this;


      function init() {
        //$scope.items = angular.copy($scope.datasource);
      }

      init();

      vm.openSideNav = function () {
        //do something
        AppUIState.sideNavOpened = true;

      };
    }],

    templateUrl = 'http://localhost:3000/app/chatter/chatter-side-nav/chatter-sidenav-button.tmpl.html';

  return {
    restrict: 'EA', //Default in 1.3+
    scope: {},
    controller: controller,
    controllerAs: 'sideNavButtonCtrl',
    templateUrl: templateUrl,
    link: function (scope, element, attrs) {

      scope.$watch(function () {
        return AppUIState.sideNavOpened;
      }, function (newval, oldval) {

        if (newval == true) {
          element.css({display: 'none'});
        }
        else {
          element.css({display: 'block'});
        }


        console.log(newval);


      });


    }
  };
}




