export default  function ChatterDialogController($mdDialog, $sce, context) {

  var vm = this;
  var level3Context,level4ContextFilters,contextDisplayData;

  vm.utilitySpriteUrl=$sce.trustAsResourceUrl('http://localhost:3000/app/chatter/contextChatterDialog/utility-sprite.html')
  vm.doctypeSpriteUrl=$sce.trustAsResourceUrl('http://localhost:3000/app/chatter/contextChatterDialog/doctype-sprite.html')
  if(typeof context.report.viewId=='undefined'){
    level3Context={dimRefs: context.cell.dimRefs, baseFormula: context.cell.columnDetails.baseFormula};
    level4ContextFilters=context.cell.filters;
    contextDisplayData=context.cell.refs;
  }
  else{
    level3Context=context.report.viewId;
    level4ContextFilters=context.report.filters;
    contextDisplayData=context.report;
  }

  vm.feedContext = {
    level1Context: context.report.currentDashboard,
    level2Context: context.report.analysisPath,
    level3Context: level3Context,
    level4Context: {filters:level4ContextFilters},
    contextDisplayData: contextDisplayData
  }


  vm.hide = function () {
    $mdDialog.hide();
  };
  vm.cancel = function () {
    $mdDialog.cancel();
  };
  vm.answer = function (answer) {
    $mdDialog.hide(answer);
  };


}
