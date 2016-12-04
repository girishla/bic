var SHA1 = <any>require("crypto-js/sha1");
import * as _ from "lodash";

export default function OBIViewDirective(BIGate, MetadataService, $compile) {
    return {
        restrict: 'A',
        replace: true,
        transclude: false,
        priority: 1001, // compiles first
        terminal: true, // prevent lower priority directives to compile after it
        controller: OBIViewDirectiveController,
        controllerAs: 'obiViewCtrl',
        scope: {
            sid: '@sid',
            viewId: '@vid'
        },
        bindToController: true,
        compile: function (tElement, attrs) {
            tElement.removeAttr('obi-view'); // necessary to avoid infinite compile loop
            var cellContents = tElement.html();
            tElement = tElement.append("<obi-table-view-popover></obi-table-view-popover>")
            tElement.attr("ng-mouseover", "obiViewCtrl.triggerMenu($event)")


            var fn = $compile(tElement);


            return function (scope) {
                fn(scope);
            };


        }
    };
}


function OBIViewDirectiveController($scope: ng.IScope, BIGate, MetadataService, $timeout, TopicService) {

    var vm = this;
    vm.viewReport = {};


    vm.triggerMenu = (event) => {
        console.log('in triggerMenu');
        $scope.$broadcast("rootEvent:showPinned");
    }

    function init() {


        // init controller

        console.log('vm.viewId', vm.viewId)

        var reportRegex = /~r:(.*?)~v:/;

        var reportId = 'r:' + reportRegex.exec(vm.viewId)[1]
        var viewReport = _.cloneDeep($.grep(MetadataService.metaDataCollection, function (e: any) {
            return e.reportId == reportId;
        }));

        viewReport[0].viewId = vm.viewId;;

        console.log('viewReport', viewReport);
        vm.context = {};
        vm.context.report = viewReport[0];
        vm.context.report.filters = BIGate.instancePromptMap;

        var level1Context = vm.context.report.currentDashboard;
        var level2Context = vm.context.report.analysisPath;
        var level3Context = vm.context.report.viewId;
        var level4Context = { filters: BIGate.instancePromptMap };

        var level1ContextHash = level1Context ? SHA1(JSON.stringify(level1Context)).toString() : level1Context;
        var level2ContextHash = level2Context ? SHA1(JSON.stringify(level2Context)).toString() : level2Context;
        var level3ContextHash = level3Context ? SHA1(JSON.stringify(level3Context)).toString() : level3Context;
        var level4ContextHash = level4Context ? SHA1(JSON.stringify(level4Context)).toString() : level4Context;

        vm.combinedHash = SHA1(JSON.stringify(level1ContextHash + level2ContextHash + level3ContextHash + level4ContextHash)).toString();
        vm.topicsCache = TopicService.getContextValueCache(vm.combinedHash);



    }
    init();

    vm.getReportContext = function () {
        return vm.viewReport;
    }

    // vm.getCellContextCollection = function () {

    //     return vm.CellContextCollection;

    // }



}
