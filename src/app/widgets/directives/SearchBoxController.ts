


import {IIndexScope} from "../../controllers/IIndexScope";


export interface ISearchBoxScope extends IIndexScope {



}

export class SearchBoxController{
  private scope: ISearchBoxScope;
  querystring:any;

  static $inject = ['$scope'];
  constructor($scope: ISearchBoxScope){
    this.scope = $scope;

  }


  public init() {

  }





  public isDisabled=false;


}

