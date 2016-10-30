import * as _ from "lodash"


export default function CellDirective($parse, $compile, TopicService) {

  var OBITableCellDirectiveController = ['$scope', '$mdDialog', '$mdMedia', '$timeout', '$sce', ChatterCellController];

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

      var cellContents = tElm.html();
      tElm.empty().append("<obi-table-cell-popover context='cellCtrl.context'>" + cellContents + "</obi-table-cell-popover>")


      return function (scope, elm, attr, controllers) {

        var tableController = controllers[0];
        var cellController = controllers[1];

        var contextCollection = tableController.getCellContextCollection();

        //Copy viewId over to the cell
        cellController.viewId = tableController.viewId;


        var context = $.grep(contextCollection, function (e: any) {
          return e.element == elm.attr('Id');
        });

        if (context && context.length > 0) {


          cellController.setContext(context[0], tableController.getReportContext());
          cellController.setCellType('Measure');


          scope.$watch(function () {
            return Object.keys(TopicService.getContextCache()).length;
          }, function (newVal) {

            var combinedHash = cellController.context.cell.contextLevels.combinedHash
            var cachedContextHashes = TopicService.getContextCache();
            if (cachedContextHashes.hasOwnProperty(combinedHash)) {
              elm.css({ backgroundColor: 'red' });
            }
            else{
              elm.css({ backgroundColor: 'white' });

            }

          },true);



        } else {
          cellController.setCellType('Dimension');
        }

        cellController.setReportContext(tableController.getReportContext());
        //console.log($parse('cellCtrl.elemId')(scope));

        // fn(scope);
      };
    }
  };
}


function ChatterCellController($scope, $mdDialog, $mdMedia, $timeout, $sce) {

  var vm = this;
  var timer;

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

}


