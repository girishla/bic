export default function ChatterViewPopoverDirective($parse, $compile, $timeout, TopicService, $rootScope) {

    var OBIChatterViewPopoverDirectiveController = ['$scope', '$mdDialog', '$mdMedia', '$timeout', '$sce', ChatterViewPopoverController];

    return {
        restrict: 'EA',
        scope: {
            //  context: '&'
        },
        transclude: true,
        controller: OBIChatterViewPopoverDirectiveController,
        templateUrl: 'chatter-view-popover.html',

        require: ['^obiView', 'obiTableViewPopover'],
        controllerAs: 'viewPopoverCtrl',
        bindToController: true,
        compile: function (tElm, tAttrs) {

            return function (scope: ng.IScope, elm, attr, controllers, transclude) {


                transclude(function (transcludeEl, tScope) {
                    // transcludeScope.context = controllers[0].context;
                    // transcludeScope.topicsCache = controllers[0].topicsCache;
                    controllers[1].context = controllers[0].context;
                    controllers[1].topicsCache = controllers[0].topicsCache;
                    console.log('controllers[0].context', controllers[0].context)



                    scope.$watch(function () {
                        var combinedHash = controllers[0].combinedHash
                        TopicService.getContextValueCache(combinedHash);
                        return TopicService.getContextValueCache(combinedHash);
                    }, function (newVal) {

                        controllers[1].topicsCache = newVal;

                        //show popover after a slight delay

                        console.log("processing watch", newVal)

                        if (newVal && newVal.topics[0].topic.pinned==true) {

                            setTimeout(function () {
                                scope.$broadcast("rootEvent:showPinned");
                            }, 500);

                        } else {
                            console.log('destroying scopes!!!', elm, newVal)
                            // scope.$destroy();
                            // transcludeScope.$destroy();

                        }


                    }, true);




                });




            };
        }
    };
}


function ChatterViewPopoverController($scope, $mdDialog, $mdMedia, $timeout, $sce) {

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


        console.log('event:', ev)

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
                $scope.dialogStatus = 'You canviewed the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            $scope.dialogCustomFullscreen = (sm === true);
        });
    };

    $scope.showChatterDialog = vm.showChatterDialog;

}



