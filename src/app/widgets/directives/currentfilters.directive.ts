
import * as _ from "../../../../bower_components/lodash"



// The widgets show how to create reusable components on top of elasticslice.
// You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
export class CurrentFiltersDirective {
  static $inject = ['$parse'];

  constructor($parse:ng.IParseService) {
    var directive:ng.IDirective = {};
    directive.restrict = 'E';
    directive.scope = true;

    (<any>directive).link = function (scope:any, element:ng.IAugmentedJQuery, attrs:any) {


      function setFilters(){

        var filters=[];

        _.forEach((scope.indexVM && scope.indexVM.filters && scope.indexVM.filters.ejsObjects),(obj)=>{
          _.flatMap(obj.toJSON(), (map)=> {
            return _.forIn(map, function(value, key) {
              var filterPair={}
              filterPair[key]=value[0];
              filters.push(filterPair)
            });
          });

        })



        scope.filters=filters;


      }


      scope.$watch('indexVM.loading', (newval, oldval) => {

        if ((oldval != newval) && (newval != true)) {
          setFilters()
        }


      });




    }


    directive.templateUrl='app/widgets/directives/currentfilters.directive.tmpl.html';

    return directive;
  }
}

