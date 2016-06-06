/* @ngInject */
export default    function chartjsPieWidget($timeout) {
  // Usage:
  //
  // Creates:
  var directive = {
    require: 'uicoreWidget',
    link: link,
    restrict: 'A'
  };
  return directive;

  function link($scope, $element, attrs, widgetCtrl) {
    widgetCtrl.setLoading(false);


    widgetCtrl.setMenu({
      icon: 'zmdi zmdi-more-vert',
      items: [{
        icon: 'zmdi zmdi-refresh',
        title: 'Refresh',
        click: function () {
          widgetCtrl.setLoading(true);
          refreshData();
          widgetCtrl.setLoading(false);

        }
      }, {
        icon: 'zmdi zmdi-share',
        title: 'Share'
      }, {
        icon: 'zmdi zmdi-print',
        title: 'Print'
      }]
    });

    function refreshData() {


      var chartData=$scope.indexVM.results && ($scope.indexVM.results.aggregations.category_chart_aggr || $scope.indexVM.results.aggregations.filtered_category_chart_aggr.category_chart_aggr);

      $scope.pieChart = {
        labels: [],
        data: [],
        colours:[],
        options: {
          responsive: true,
          maintainAspectRatio: true
        }
      };

      if (chartData && chartData.buckets && chartData.buckets.length ) {


        angular.forEach(chartData.buckets, (value, key)=> {
          $scope.pieChart.labels.push(value.key)

          switch(value.key) {

            case 'Promoter':
              $scope.pieChart.colours.push('#A9F5A9');
                  break;
            case 'Passive':
              $scope.pieChart.colours.push('#FAAC58');
                  break
            case 'Detractor':
              $scope.pieChart.colours.push('#FA5858');

          }

          $scope.pieChart.data.push(value.doc_count);


        })

      }
      else {
        $scope.pieChart.labels=['No Results'];
        $scope.pieChart.data=[1];
        $scope.pieChart.colours.push('#808080');
      }


    }


    $scope.$watch('indexVM.loading', (newval, oldval) => {

      if ((oldval != newval) && (newval!=true)) {
        refreshData()
      }


    });



  }
}
