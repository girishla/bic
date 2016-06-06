/* @ngInject */
export default    function moduleConfig($stateProvider, uicoreMenuProvider) {

  $stateProvider

    .state('elasticslice.dashboard-search', {
      url: '/dashboards/search?portal',
      templateUrl: 'app/dashboards/analytics/dashboard-search.tmpl.html',
      controller: 'DashboardAnalyticsController',
      controllerAs: 'vm'
    })
    .state('elasticslice.dashboard-NPS', {
      url: '/dashboards/npssummary',
      templateUrl: 'app/dashboards/analytics/dashboard-nps.tmpl.html',
      controllerAs: 'vm'
    })

  uicoreMenuProvider.addMenu({
    name: 'Dashboards',
    icon: 'zmdi zmdi-home',
    type: 'dropdown',
    priority: 1.1,
    children: [{
      name: 'Search',
      state: 'elasticslice.dashboard-search',
      type: 'link'
    }/*,{
      name: 'NPS Summary',
      state: 'elasticslice.dashboard-NPS',
      type: 'link'
    }*/]
  });

}


