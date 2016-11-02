

export default function OBITableDirective(BIGate, metaDataResponses, $compile) {
  return {
    restrict: 'A',
    replace: true,
    transclude: false,
    priority: 1001, // compiles first
    terminal: true, // prevent lower priority directives to compile after it
    controller: OBITableDirectiveController,
    controllerAs: 'obiTblCtrl',
    scope: {
      sid: '@sid',
      viewId: '@id'
    },
    bindToController: true,
    compile: function (tElement, attrs) {
      tElement.removeAttr('obi-table'); // necessary to avoid infinite compile loop

      var viewUniqueId = BIGate.getReportIdFromElement(tElement);

      //console.log('viewUniqueId:' + viewUniqueId)

      //Find Report Metadata and put the searchId as an Attribute on the element. This will also be stored on the scope
      var reportRegex = /~r:(.*?)~v:/;
      var reportId = 'r:' + reportRegex.exec(viewUniqueId)[1]
      var viewReport = $.grep(metaDataResponses, function (e: any) {
        return e.reportId == reportId;
      });
      attrs.$set('sid', viewReport[0].searchId);

      var currentTableCells = tElement.find('td[id^=e_saw],td[id^=db_saw]');


      $.each(currentTableCells, function (viewIdx, value) {

        var tableCell = $(value);
        //do nothing and return if already compiled
        if (!(tableCell.attr('obi-table-cell') == 'true')) {
          //Set child directives before compile

          tableCell.attr('obi-table-cell', 'true');


        }
      })

      var fn = $compile(tElement);
      return function (scope) {
        fn(scope);
      };
    }
  };
}


function OBITableDirectiveController($scope, BIGate, metaDataResponses, CellContext, $timeout) {

  var vm = this;
  vm.viewReport = {};


  function init() {

    // init controller
    var viewReport = $.grep(metaDataResponses, function (e: any) {
      return e.searchId === vm.sid;
    });
    vm.viewReport = viewReport[0];

    vm.CellContextCollection = CellContext.getContextCollection()

    // TODO discard colmaps as we dont need them. deletion  is causing an issue as the colmaps are refenced in the collection population
    //delete vm.viewReport.colMap;

  }

  init();

  vm.getReportContext = function () {


    return vm.viewReport;


  }

  vm.getCellContextCollection = function () {

    return vm.CellContextCollection;

  }



}
