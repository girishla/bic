export default  function ChatterDialogController($mdDialog, $sce, context) {

  var vm = this;

  vm.utilitySpriteUrl=$sce.trustAsResourceUrl('http://localhost:3000/app/chatter/contextChatterDialog/utility-sprite.html')
  vm.doctypeSpriteUrl=$sce.trustAsResourceUrl('http://localhost:3000/app/chatter/contextChatterDialog/doctype-sprite.html')

  console.log('level 4 Context')
  console.log(context.cell.filters)
  console.log('dimprefs')
  console.log(context.cell.dimRefs);

  vm.feedContext = {
    level1Context: context.report.currentDashboard,
    level2Context: context.report.analysisPath,
    level3Context: {dimRefs: context.cell.dimRefs, baseFormula: context.cell.columnDetails.baseFormula},
    level4Context: {filters:context.cell.filters},
    contextDisplayData: context.cell.refs
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
