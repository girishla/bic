

/* @ngInject */
export default  function DashboardAnalyticsController($scope, $timeout, $mdToast, $rootScope, $state, $mdDialog, $mdSidenav, uicoreLayout, $stateParams) {


  /*
   $timeout(function () {
   $rootScope.$broadcast('newMailNotification');
   $mdToast.show({
   template: '<md-toast><span flex>You have new notifications! View them <a href="" ng-click=vm.viewUnread()>here</a></span></md-toast>',
   controller: newMailNotificationController,
   controllerAs: 'vm',
   position: 'bottom right',
   hideDelay: 5000
   });
   }, 10000);
   */

  //////////////

  var vm = this;

  vm.sortBy='Relevance';
  vm.sortByField='surveyDate';
  // vm.currentFilters=$scope.indexVM && $scope.indexVM.getFilters();





  function newMailNotificationController() {
    var vm = this;
    vm.viewUnread = function () {
      $state.go('elasticslice-no-scroll.email.inbox');
    };
  }

  this.showDetailsDialog = function (event, item) {


    $mdDialog.show({

      controller: LoadDataDialogController,
      templateUrl: 'app/dashboards/analytics/response-details-dialog.tmpl.html',
      targetEvent: event,
      locals: {
        item: item
      },
      clickOutsideToClose: true
    })
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, cancelDialog);

  }



  this.getSort = function () {


    switch (vm.sortBy) {

      case 'Relevance':
        return;
      case 'Newest First':
        return ejs.Sort('surveyDate').order('desc');
      case 'Oldest First':
        return ejs.Sort('surveyDate').order('asc');
      case 'Account':
        return ejs.Sort('billingAccountId').order('asc');
      case 'Product Family':
        return ejs.Sort('productFamily').order('desc');
    }



  }


  this.openSidebar = function (id) {
    $mdSidenav(id).toggle();
  };

  function LoadDataDialogController($scope, $mdDialog, item) {
    $scope.item = item;

    $scope.closeDialog = function () {
      $mdDialog.cancel();
    };
  }




  function cancelDialog() {
    $scope.alert = 'You closed details dialog ';
  }

  function init() {

    //Hide nav and top toolbar if portal=true param is passed in the url
    if ($stateParams.portal == "true") {

      uicoreLayout.setOption('showLeftSideNav', false);
      uicoreLayout.setOption('showToolbar', false);

    }


  }

  init();

}
