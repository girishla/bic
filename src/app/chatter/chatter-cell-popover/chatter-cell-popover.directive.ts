export default function ChatterCellPopoverDirective($parse, $compile, $timeout) {

    var OBIChatterCellPopoverDirectiveController = ['$scope', '$mdDialog', '$mdMedia', '$timeout', '$sce', ChatterCellPopoverController];

    return {
        restrict: 'EA',
        scope: {
          //  context: '&'
        },
        transclude: true,
        template: '<a href uib-popover-template="\'http://localhost:3000/app/chatter/chatter-cell-popover/chatter-cell-popover.html\'" popover-trigger="\'showcellpopover\'" popover-placement="right" ng-transclude></a>',
    //NB need to escape the single quote here ^    and here ^
    
        controller: OBIChatterCellPopoverDirectiveController,
        require: ['^obiTableCell','obiTableCellPopover'],
        controllerAs: 'cellPopoverCtrl',
        bindToController: true,
        compile: function (tElm, tAttrs) {

            return function (scope, elm, attr, controllers) {

                var timer;


                elm.on("mouseenter", function (e) {
                    console.log('in mouseenter')
                    //controller.showCellPopover(e);
                    console.log(e.target)
                    //$(event.target).trigger('click');

                controllers[1].context=controllers[0].context;
                console.log('context')
                console.log(controllers[0].context);


                    timer = $timeout(function () {
                        $(e.target).trigger('showcellpopover');
                    }, 500);

                })


                elm.on("mouseleave", function (e) {
                    console.log('in mouseleaveeeeee')
                    //controller.hideCellPopover(e);
                    console.log(e.target)

                    $timeout.cancel(timer);
                    $(e.target).trigger('hidecellpopover');
                    $(e.target).closest('obi-table-cell-popover').children().trigger('hidecellpopover');

                    
                })

                

            };
        }
    };
}


function ChatterCellPopoverController($scope, $mdDialog, $mdMedia, $timeout, $sce) {

    var vm = this;
    var timer;

    $scope.dialogStatus = '  ';
    $scope.dialogCustomFullscreen = $mdMedia('sm');
    //    vm.templateUrl='http://localhost:3000/app/chatter/chatter-cell-popover/chatter-cell-popover.html';
    vm.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');

    // vm.test="Gila";

    function init() {
        //Do any init activities - if any
        vm.test = "Girish";

    }

    init();


    vm.showCellPopover = function (event) {

        console.log(event.target)
        //$(event.target).trigger('click');

        timer = $timeout(function () {
            $(event.target).trigger('showcellpopover');
        }, 500);



    }


    vm.hideCellPopover = function (event) {

        console.log(event.target)

        $timeout.cancel(timer);
        $(event.target).trigger('hidecellpopover');
        //Close the info again
        // $timeout(function () {
        //   $(event.target).trigger('hidecellpopover');
        // }, 3000);

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

    $scope.showChatterDialog = vm.showChatterDialog;

}


