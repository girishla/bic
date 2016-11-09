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
            return TopicService.getContextCache();
          }, function (newVal) {



            var combinedHash = cellController.context.cell.contextLevels.combinedHash

            var cachedContextHashes = TopicService.getContextCache();

            console.log('Cell Scope Watch:',elm,context[0])

            // console.log('combinedHash for');
            // console.log(cellController.context.cell);

            // console.log(combinedHash);
            // console.log(cachedContextHashes);
            if (cachedContextHashes.hasOwnProperty(combinedHash) && cachedContextHashes[combinedHash] > 0) {
              //elm.css({ backgroundColor: 'red' });
              console.log('Found Topics for cell:' ,elm)
              if (elm.find('.bic-cell-badge-container').length==0) {
                elm.append("<div class='bic-cell-badge-container'></div>");
                elm.find('.bic-cell-badge-container').append('<div id="badge-container"><span class="bic-cell-badge">' + cachedContextHashes[combinedHash] + '</span></div>')
              }
              else {
                elm.find('.bic-cell-badge').html(cachedContextHashes[combinedHash])
              }

            }
            else {
              // //elm.css({ backgroundColor: 'white' });
              elm.find('.bic-cell-badge-container').remove();

            }

          }, true);



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


