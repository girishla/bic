export default function ChatterCellPopoverDirective($parse, $compile, $timeout, TopicService, $rootScope) {

    var OBIChatterCellPopoverDirectiveController = ['$scope', '$mdDialog', '$mdMedia', '$timeout', '$sce', ChatterCellPopoverController];

    return {
        restrict: 'EA',
        scope: {
            //  context: '&'
        },
        transclude: true,
        controller: OBIChatterCellPopoverDirectiveController,
        templateUrl: 'chatter-cell-popover.html',

        require: ['^obiTableCell', 'obiTableCellPopover'],
        controllerAs: 'cellPopoverCtrl',
        bindToController: true,
        compile: function (tElm, tAttrs) {

            return function (scope, elm, attr, controllers, transclude) {

                transclude(function (transcludeEl) {
                    // transcludeScope.context = controllers[0].context;
                    // transcludeScope.topicsCache = controllers[0].topicsCache;
                    controllers[1].context = controllers[0].context;
                    controllers[1].topicsCache = controllers[0].topicsCache;
                    // console.log('controllers[0].topicsCache', transcludeScope, scope)



                    scope.$watch(function () {
                        var combinedHash = controllers[0].context && controllers[0].context.cell.contextLevels.combinedHash
                        TopicService.getContextValueCache(combinedHash);
                        return TopicService.getContextValueCache(combinedHash);
                    }, function (newVal) {

                        controllers[1].topicsCache = newVal;

                        //show popover after a slight delay

                        console.log("processing watch", newVal.topics[0].topic,newVal)

                        if (newVal && newVal.topics[0].topic.pinned==true) {

                            setTimeout(function () {
                                scope.$broadcast("rootEvent:showPinned");
                            }, 500);

                        } else {
                            console.log('destroying scopes!!!', elm, newVal)
                            // scope.$destroy();
                            // transcludeScope.$destroy();

                        }


                    },true);

                });



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
        //Do any init activities 

    }

    init();



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



