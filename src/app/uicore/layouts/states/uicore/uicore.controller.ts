'use strict';

/**
 * @ngdoc function
 * @name AdminController
 * @module uicore
 * @kind function
 *
 * @description
 *
 * Handles the admin view
 */

    /* @ngInject */
 export default  function uicoreStateController($scope, $rootScope, $timeout, $templateRequest, $compile, $element, $window, uicoreLayout, uicoreLoaderService ) {
        var loadingQueue = [];
        var vm = this;

        vm.activateHover = activateHover;
        vm.removeHover  = removeHover;
        vm.showLoader = uicoreLoaderService .isActive();

        // we need to use the scope here because otherwise the expression in md-is-locked-open doesnt work
        $scope.layout = uicoreLayout.layout; //eslint-disable-line


        ////////////////

        function activateHover() {
            if(uicoreLayout.layout.sideMenuSize === 'icon') {
                $element.find('.uicore-sidenav-left').addClass('hover');
                $timeout(function(){
                    $window.dispatchEvent(new Event('resize'));
                }, 300);
            }
        }

        function injectFooterUpdateContent(viewName) {
            var contentView = $element.find('.uicore-content');
            if (viewName === '@elasticslice' && angular.isDefined(uicoreLayout.layout.footerTemplateUrl)) {
                // add footer to the content view
                $templateRequest(uicoreLayout.layout.footerTemplateUrl)
                .then(function(template) {
                    // compile template with current scope and add to the content
                    var linkFn = $compile(template);
                    var content = linkFn($scope);
                    $timeout(function() {
                        contentView.append(content);
                    });
                    // console.log('add footer', content);
                });
            }
        }

        function loaderEvent(event, isActive) {
            vm.showLoader = isActive;
        }

        function stateChangeStart() {
            // state has changed so start the loader
            uicoreLoaderService .setLoaderActive(true);
        }

        function removeHover () {
            if(uicoreLayout.layout.sideMenuSize === 'icon') {
                $element.find('.uicore-sidenav-left').removeClass('hover');
                $timeout(function(){
                    $window.dispatchEvent(new Event('resize'));
                }, 300);
            }
        }

        function viewContentLoading($event, viewName) {
            // a view is loading so add it to the queue
            // so we know when to turn off the loader
            loadingQueue.push(viewName);
        }

        function viewContentLoaded($event, viewName) {
            if(angular.isDefined(uicoreLayout.layout.footer) && uicoreLayout.layout.footer === true) {
                // inject footer into content
                injectFooterUpdateContent(viewName);
            }

            // view content has loaded so remove it from queue
            var index = loadingQueue.indexOf(viewName);
            if(-1 !== index) {
                loadingQueue.splice(index, 1);
            }
            // is the loadingQueue empty?
            if(loadingQueue.length === 0) {
                // nothing left to load so turn off the loader
                uicoreLoaderService .setLoaderActive(false);
            }
        }

        // watches

        // register listeners for loader
        $scope.$on('loader', loaderEvent);

        // watch for ui router state change
        $scope.$on('$stateChangeStart', stateChangeStart);

        // watch for view content loading
        $scope.$on('$viewContentLoading', viewContentLoading);

        // watch for view content loaded
        $scope.$on('$viewContentLoaded', viewContentLoaded);
    }

