

export function SidenavPushInDirective() {
  return {
    restrict: 'A',
    require: '^mdSidenav',
    link: function ($scope, element, attr, sidenavCtrl) {
      var body = angular.element('.ComponentHeader');
      body.addClass('md-sidenav-push-in');
      var cssClass = (element.hasClass('md-sidenav-left') ? 'md-sidenav-left' : 'md-sidenav-right') + '-open';
      var stateChanged = function (AppUIState) {
        body[AppUIState ? 'addClass' : 'removeClass'](cssClass);
      };
      // overvwrite default functions and forward current AppUIState to custom function
      angular.forEach(['open', 'close', 'toggle'], function (fn) {
        var org = sidenavCtrl[fn];
        sidenavCtrl[fn] = function () {
          var res = org.apply(sidenavCtrl, arguments);
          stateChanged(sidenavCtrl.isOpen());
          return res;
        };
      });
    }
  };
}


export function ObiSideNavDirective() {

  var controller = ['$scope', '$timeout', '$mdSidenav', '$log','AppUIState','BIGate', function ($scope, $timeout, $mdSidenav, $log,AppUIState,BIGate) {


      var vm=this;

      vm.toggleLeft = buildDelayedToggler('left');
      vm.toggleRight = buildToggler('right');

      vm.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
            AppUIState.sideNavOpened = false;
          });
      };


      vm.feedContext={

        level1Context: BIGate.currentDashPath,
        level2Context: '',
        level3Context: '',
        level4Context: '',
        contextDisplayData: {}

      }


      $scope.$watch(function () {
        return AppUIState.sideNavOpened;
      },function(newVal,oldval){

        //vm.toggleRight();
        if(newVal==true){
          $mdSidenav('right').open();
        }
        else{
          $mdSidenav('right').close();

        }
        console.log('open/close from watch inside sideNav directive....');

      });


      $scope.$watch(function () {
        return $mdSidenav('right').isOpen();
      },function(){

        if($mdSidenav('right').isOpen()){
          AppUIState.sideNavOpened=true;
        }
        else{
          AppUIState.sideNavOpened=false;
        }


      });



      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait) {
        var timer;
        return function debounced() {
          var context = vm,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }
      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }
      }


    }],

    templateUrl = 'http://localhost:3000/app/chatter/chatter-side-nav/chatter-sidenav.tmpl.html';

  return {
    restrict: 'EA', //Default in 1.3+
    scope: {

    },
    controller: controller,
    controllerAs: 'sideNavCtrl',
    templateUrl: templateUrl
  };
}



