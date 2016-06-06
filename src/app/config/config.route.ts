
  /* @ngInject */
export default  function routeConfigApp($stateProvider, $urlRouterProvider) {
    // Setup the apps routes

    // 404 & 500 pages
    $stateProvider
      .state('404', {
        url: '/404',
        views: {
          'root': {
            templateUrl: 'app/404.tmpl.html',
            controller: 'ErrorPageController',
            controllerAs: 'vm'
          }
        }
      })

      .state('401', {
        url: '/401',
        views: {
          'root': {
            templateUrl: 'app/401.tmpl.html',
            controller: 'ErrorPageController',
            controllerAs: 'vm'
          }
        }
      })

      .state('500', {
        url: '/500',
        views: {
          'root': {
            templateUrl: 'app/500.tmpl.html',
            controller: 'ErrorPageController',
            controllerAs: 'vm'
          }
        }
      });


    // set default routes when no path specified
    $urlRouterProvider.when('', '/dashboards/search');
    $urlRouterProvider.when('/', '/dashboards/search');

    // always goto 404 if route not found
    $urlRouterProvider.otherwise('/404');
  }
