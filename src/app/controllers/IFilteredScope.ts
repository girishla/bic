import {FilterCollection} from "../util/FilterCollection";

export interface IFilteredScope extends ng.IScope {
  filters:FilterCollection;
  combinedFilter:any;
}
