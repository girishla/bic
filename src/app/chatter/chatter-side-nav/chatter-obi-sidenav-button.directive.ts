



export default function ObiSideNavButtonDirective(AppUIState) {

  var controller = ['$scope', 'AppUIState', '$ocLazyLoad', '$compile', 'MetadataService','$rootScope','TopicService', function ($scope, AppUIState, $ocLazyLoad, $compile, MetadataService,$rootScope:ng.IRootScopeService,TopicService) {


    var vm = this;


    function init() {
      //$scope.items = angular.copy($scope.datasource);



    }

    init();

    vm.openSideNav = function () {




      try {

        angular.module("chatter-feed.module");
        AppUIState.sideNavOpened = true;

      } catch (err) {
        AppUIState.progressOn();
        //give angular a chance to display the wait dialog
        setTimeout(function () {
          var BootstrapService: any = (<any>require("../chatter-bootstrap.service")).default;
          BootstrapService.startChatterFeed(MetadataService, $ocLazyLoad, AppUIState, $compile, $scope,$rootScope,TopicService);

        }, 100);

      }


      //do something


    };
  }]

  //templateUrl = require('raw!chatter/chatter-side-nav/chatter-sidenav-button.tmpl.html');
  //templateUrl = require('ngtemplate!html!./chatter-sidenav-button.tmpl.html');

  return {
    restrict: 'EA', //Default in 1.3+
    scope: {},
    controller: controller,
    controllerAs: 'sideNavButtonCtrl',
    templateUrl: 'http://localhost:3000/app/chatter/chatter-side-nav/chatter-sidenav-button.tmpl.html',
    link: function (scope, element, attrs) {

      scope.$watch(function () {
        return AppUIState.sideNavOpened;
      }, function (newval, oldval) {

        if (newval == true) {
          element.css({ display: 'none' });
        }
        else {
          element.css({ display: 'block' });
        }


        console.log(newval);


      });


    }
  };
}




