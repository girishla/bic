export default function ChatterCellPopoverDirective($parse, $compile, $timeout) {

    var OBIChatterCellPopoverDirectiveController = ['$scope', '$mdDialog', '$mdMedia', '$timeout', '$sce', ChatterCellPopoverController];

    return {
        restrict: 'EA',
        scope: {
            //  context: '&'
        },
        transclude: true,
        template: '<div style="display:inline" uib-popover-template="\'http://localhost:3000/app/chatter/chatter-cell-popover/chatter-cell-popover.html\'" popover-trigger="\'showcellpopover\'" popover-placement="right" ng-transclude></div>',

        controller: OBIChatterCellPopoverDirectiveController,
        require: ['^obiTableCell', 'obiTableCellPopover'],
        controllerAs: 'cellPopoverCtrl',
        bindToController: true,
        compile: function (tElm, tAttrs) {

            return function (scope, elm, attr, controllers) {

                var timer;

                elm.on("mouseenter", function (e) {

                    controllers[1].context = controllers[0].context;
                    timer = $timeout(function () {
                        //Context only set for measure columns and the popover is shown only if its a measure.
                        if(controllers[0].context){                            
                            $(e.target).closest('obi-table-cell-popover').children().trigger('showcellpopover');
                            console.log('triggering popover')
                        }
                    }, 500);

                })

                elm.on("mouseleave", function (e) {

                    $timeout.cancel(timer);
                    //in cases where the user hovers the cell and leaves
                    $(e.target).trigger('hidecellpopover');
                    //In cases where the user hovers over the popover and leaves
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
//    vm.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');

    function init() {
        //Do any init activities - if any

    }

    init();

/*
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
*/



    vm.showChatterDialog = function (ev) {

        $mdDialog.show({
            controller: 'chatterDialogController',
            controllerAs: 'dialogCtrl',
            bindToController: true,

            templateUrl: "http://localhost:3000/app/chatter/chatter-cell-dialog/chatter-dialog.html",
            parent: angular.element('.ComponentHeader'),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && $scope.dialogCustomFullscreen,
            locals: {
                context: vm.context,
            }
        })
            .then(function (answer) {
                $scope.dialogStatus = 'Dialog status: "' + answer + '".';
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


