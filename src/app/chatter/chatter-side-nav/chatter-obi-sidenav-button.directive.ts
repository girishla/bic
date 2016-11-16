



export default function ObiSideNavButtonDirective(AppUIState) {

  var controller = ['$scope', 'AppUIState', '$ocLazyLoad', '$compile', 'MetadataService', function ($scope, AppUIState, $ocLazyLoad, $compile, MetadataService) {


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

        var BootstrapService: any = (<any>require("../chatter-bootstrap.service")).default;
        var initInjector = angular.injector(["ng", "chatter.module"]);
        var BIGate: any = initInjector.get("BIGate");
        BootstrapService.chatterLoading = true;

        MetadataService.getMedataCollection().then(function () {

          BootstrapService.chatterLoaded = true;
          BootstrapService.chatterLoading = false;
          BootstrapService.attachDirectives();
          BootstrapService.observeSensitiveDOMChanges();

          require.ensure(['../chatter-feed/chatter-feed.module.ts'], function () {
            // let module = require('../chatter-feed/chatter-feed.module.ts');

            console.log('attempting to lazy load');
            var module = (<any>require('chatter/chatter-feed/chatter-feed.module')).default();
            $ocLazyLoad.inject({
              name: 'chatter-feed.module'
            }).then(function () {
              AppUIState.sideNavOpened = true;
              $compile(angular.element('.ComponentHeader'))($scope);

            }, function (err) {
              console.log('lazy load errors', err)
            });


          })



        })



        // var contextCollection = BIGate.getViewDataReferences();


        // var allReportsPromises = BIGate.getAllReportsXML();

        // allReportsPromises.then(function (responses: any) {
        //   var allMetadataPromises = BIGate.getAllReportsMetadata(responses);


        //   console.log('allMetadataPromises', allMetadataPromises);

        //   allMetadataPromises.then(function (metaDataResponses: any) {
        //     console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
        //     //console.log(metaDataResponses);
        //     var mergedCollection = BIGate.getMergedContextCollection(metaDataResponses, contextCollection);
        //     //Load metadata and Context Info into an app Constant so it is available as a service throughout
        //     angular
        //       .module('chatter.module')
        //       .constant('metaDataResponses', metaDataResponses)
        //       .value('contextCollection', mergedCollection);

        //     BootstrapService.chatterLoaded = true;
        //     BootstrapService.chatterLoading = false;
        //     BootstrapService.attachDirectives();
        //     BootstrapService.observeSensitiveDOMChanges();

        //     require.ensure(['../chatter-feed/chatter-feed.module.ts'], function () {
        //       // let module = require('../chatter-feed/chatter-feed.module.ts');

        //       console.log('attempting to lazy load');
        //       var module = (<any>require('chatter/chatter-feed/chatter-feed.module')).default();
        //       $ocLazyLoad.inject({
        //         name: 'chatter-feed.module'
        //       }).then(function () {
        //         AppUIState.sideNavOpened = true;
        //         $compile(angular.element('[obi-side-nav]'))($scope);

        //       }, function (err) {
        //         console.log('lazy load errors', err)
        //       });


        //     })

        //   })
        // });






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




