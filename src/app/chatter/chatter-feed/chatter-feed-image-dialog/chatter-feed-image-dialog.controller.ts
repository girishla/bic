export default  function ChatterFeedImageDialogController($mdDialog,dialogData) {

  var vm = this;

  vm.dialogData=dialogData;

  vm.imageURL='http://localhost:8000' + dialogData.imageURL;

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
