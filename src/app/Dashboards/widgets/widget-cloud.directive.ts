// declare var jQCloud;

//import * as _ from "lodash";
import {AngularTool} from "../../util/AngularTool";

interface iJQCloud extends JQuery {

  jQCloud:any;
}


/* @ngInject */
export default    function cloudWidget($parse) {
  // Usage:
  //
  // Creates:
  //

  var directive:{restrict:string; templateUrl:string;scope:boolean; replace:boolean; link:(($scope, $elem, $attr, widgetCtrl)=>any)};
  var defaults = jQuery.fn.jQCloud.defaults.get(),
    jqcOptions = [];

  for (var opt in defaults) {
    if (defaults.hasOwnProperty(opt)) {
      jqcOptions.push(opt);
    }
  }

  

  directive = {
    restrict: 'E',
    templateUrl: 'app/dashboards/widgets/widget-cloud.tmpl.html',
    // template:'<div></div>',
    replace: true,
    scope: true,
    link: ()=>null
    /*    scope: {
     words: '=words',
     afterCloudRender: '&'
     },*/


  };

  (<any>directive).link = {

    'pre': function (scope, elem, attrs) {
      AngularTool.setupBinding($parse, scope, attrs, ["field"]);
    },

    'post': function ($scope, $elem, $attr) {

      var
        options:any = {};


      $scope.words = [];
      $scope.cloudFiltersExist = false;

      for (var i = 0, l = jqcOptions.length
        ; i < l; i++) {
        var opt = jqcOptions[i];
        var attr = $attr[
            opt] || $elem.attr(opt);
        if (attr !== undefined) {
          options[opt] =

            $parse(attr)();
        }
      }

      if ($scope.afterCloudRender) {
        options.afterCloudRender = $scope.afterCloudRender;
      }

      var jqElem = <iJQCloud>jQuery($elem);


      jqElem.jQCloud($scope.words, options);

      $scope.$watchCollection('words',
        function () {
          $scope.$evalAsync(function () {
            var words = [];
            $.extend(
              words
              ,

              $scope.words);
            jqElem.jQCloud(
              'update', words);
          });


        });
      $elem.bind('$destroy', function () {
        jqElem.jQCloud('destroy');
      });

      function setWords() {

        var cloudData = $scope.indexVM.results && ($scope.indexVM.results.aggregations[$scope.field + '_cloud_aggr'] || $scope.indexVM.results.aggregations['filtered_' + $scope.field + '_cloud_aggr'][$scope.field + '_cloud_aggr']);
        $scope.words = [];
        $scope.cloudFiltersExist = false;


        angular.forEach(
          cloudData && cloudData.buckets, (bucket)=> {

            if (!(_.find($scope.indexVM.getFilters(), (filter)=> {
                return filter[$scope.field] === bucket.key;

              }))) {

              $scope.words.push({text: bucket.key, weight: bucket.doc_count})

            }
            else {
              $scope.cloudFiltersExist = true;
            }
          })


      }


      $scope.removeWord = function (word) {

        $scope.words.splice(_.findIndex($scope.words, (item:any)=> item.text == word), 1);


      }

      $scope.$watch('indexVM.loading', (newval, oldval) => {

        if ((oldval != newval) && (newval != true)) {
          setWords()
        }


      });


    }

  }

  return directive;

}
