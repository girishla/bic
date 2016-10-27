export default function CellDirective($parse, $compile) {

  var OBITableCellDirectiveController = ['$scope', '$mdDialog', '$mdMedia','$timeout', ChatterCellController];

  return {
    restrict: 'EA', //Default in 1.3+
    scope: {
      elemId: '@id'
    },
    controller: OBITableCellDirectiveController,
    require: ['^obiTable', 'obiTableCell'],
    controllerAs: 'cellCtrl',
    bindToController: true,
    compile: function (tElm, tAttrs) {

      tElm.removeAttr('obi-table-cell'); // necessary to avoid infinite compile loop
      var cellContents = tElm.html();
      tElm.empty().append("<div>" + cellContents + "</div>")
      var popoverElem = tElm.find('div')
      popoverElem.attr('uib-popover', 'I am on mouse enter!');
      //popoverElem.attr('popover-trigger', "'mouseenter'");
      //popoverElem.attr('popover-autoclose', '2000');
      var fn = $compile(tElm);
      var exp = $parse('cellCtrl.showChatterDialog($event)');
      var expPopover=$parse('cellCtrl.showCellPopover($event)')


      return function (scope, elm, attr, controllers) {

        var tableController = controllers[0];
        var cellController = controllers[1];

        var contextCollection = tableController.getCellContextCollection();

        //Copy viewId over to the cell
        cellController.viewId = tableController.viewId;

        elm.on('dblclick', function (e) {
          exp(scope,{$event: e});
        });

        elm.on( "click", function(e){
          expPopover(scope,{$event: e});
        } )

        var context = $.grep(contextCollection, function (e:any) {
          return e.element == elm.attr('Id');
        });


        if (context && context.length > 0) {
          cellController.setContext(context[0], tableController.getReportContext());
          cellController.setCellType('Measure');

          //Check if Topics exist and place cell Marker;
          elm.css({backgroundColor: 'red'});

        } else {
          cellController.setCellType('Dimension');
        }

        cellController.setReportContext(tableController.getReportContext());
        //console.log($parse('cellCtrl.elemId')(scope));

        fn(scope);
      };
    }
  };
}


function ChatterCellController($scope, $mdDialog, $mdMedia,$timeout) {

  var vm = this;

  $scope.dialogStatus = '  ';
  $scope.dialogCustomFullscreen = $mdMedia('sm');

  vm.setContext = function (context, reportContext) {
    vm.cellContextInfo = context;
    vm.context = {
      cell: context,
      report: reportContext
    }
  };

  vm.setReportContext = function (reportContext) {
    vm.reportContextInfo = reportContext;
  }

  vm.setCellType = function (type) {
    vm.cellType = type;
  }

  function init() {
    //Do any init activities - if any


  }

  init();


  vm.showCellPopover=function(event){

    console.log(event.target)
    //$(event.target).trigger('click');
    //Close the info again
    $timeout(function () {
      $(event.target).trigger('hidecellpopover');
    }, 3000);
    
  }


  vm.showChatterDialog = function (ev) {

    console.log(ev);


    $mdDialog.show({
      controller: 'chatterDialogController',
      controllerAs: 'dialogCtrl',
      bindToController: true,

      templateUrl: "http://localhost:3000/app/chatter/chatter-cell-dialog/chatter-dialog.html",
      /*parent: angular.element(angular.element(document.getElementById('d:dashboard~p:2i41s4pgps2jop6q~r:gvf5n0lc1ns2vva2~v:compoundView!1ViewContainer'))),*/
      parent: angular.element('.ComponentHeader'),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $mdMedia('sm') && $scope.dialogCustomFullscreen,
      locals: {
        context: vm.context,
      }
    })
      .then(function (answer) {
        $scope.dialogStatus = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.dialogStatus = 'You cancelled the dialog.';
      });
    $scope.$watch(function () {
      return $mdMedia('sm');
    }, function (sm) {
      $scope.dialogCustomFullscreen = (sm === true);
    });
  };
}


