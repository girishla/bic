import {EjsCollection} from "./EjsCollection";
import {FilterTool} from "./FilterTool";

export class FilterCollection extends EjsCollection {
  public getAsFilter():any [] {
    return FilterTool.combineFilters(this.ejsObjects);
  }

  public getAsORFilter():any[] {
    return FilterTool.combineFiltersShould(this.ejsObjects);
  }

  public contains(filter:any):boolean {
    return this.indexOf(filter) > -1;
  }

  public doesExist(name:string):boolean{


    
    return true;

  }

}
