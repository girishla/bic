/* @ngInject */
export default    function permissionConfig($stateProvider, uicoreMenuProvider) {
  $stateProvider
    .state('elasticslice.permission', {
      url: '/permission',
      templateUrl: 'app/permission/pages/permission.tmpl.html',
      controller: 'PermissionController',
      controllerAs: 'vm',
      resolve: {
        users: ['UserService', function (UserService) {
          return UserService.getUsers();
        }]
      },
      data: {
        layout: {
          contentClass: 'layout-column'
        }
      }
    })
    .state('elasticslice.permission-define', {
      url: '/permission/define',
      templateUrl: 'app/permission/pages/permission-define.tmpl.html',
      data: {
        layout: {
          contentClass: 'layout-column'
        }
      }
    })
    .state('elasticslice.permission-routes', {
      url: '/permission/routes',
      templateUrl: 'app/permission/pages/permission-routes.tmpl.html',
      data: {
        layout: {
          contentClass: 'layout-column'
        }
      }
    })
    .state('elasticslice.permission-views', {
      url: '/permission/views',
      templateUrl: 'app/permission/pages/permission-views.tmpl.html',
      data: {
        layout: {
          contentClass: 'layout-column'
        }
      }
    });

  uicoreMenuProvider.addMenu({
    name: 'Permissions',
    icon: 'zmdi zmdi-lock',
    type: 'dropdown',
    priority: 4.1,
    children: [{
      name: 'Permissions',
      state: 'elasticslice.permission',
      type: 'link'
    }, {
      name: 'Define Roles',
      state: 'elasticslice.permission-define',
      type: 'link'
    }, {
      name: 'Routes',
      state: 'elasticslice.permission-routes',
      type: 'link'
    }, {
      name: 'Views',
      state: 'elasticslice.permission-views',
      type: 'link'
    }]
  });
}

