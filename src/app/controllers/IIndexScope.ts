import {IFilteredScope} from './IFilteredScope'
import {SimpleSet} from "../util/SimpleSet";
import {FilterCollection} from "../util/FilterCollection";

export interface IIndexScope extends IFilteredScope {
  indexVM:IIndexViewModel;
  ejs:any;
}

export interface IIndexViewModel {
  host:any;
  query:any;
  sort:any;
  aggregationProviders:SimpleSet;
  filters:FilterCollection;
  highlight:any;
  loaded:boolean;
  loading:boolean;
  page:number;
  index:string;
  pageCount:number;
  pageSize:number;
  results:any;
  refresh:(softRefresh?:boolean) => void;
  error:any;
  autoLoad:boolean;
}
