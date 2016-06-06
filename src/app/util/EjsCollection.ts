import {EjsTool} from "./EjsTool";

export class EjsCollection {
  public ejsObjects:any = [];
  public jsonObjects:any = [];

  public indexOf(ejsObject:any) {
    return this.jsonObjects.indexOf(EjsTool.getJsonFromEjsObject(ejsObject));
  }

  public add(ejsObject:any) {
    var idx = this.indexOf(ejsObject);
    if (idx == -1) {
      this.ejsObjects.push(ejsObject);
      this.jsonObjects.push(EjsTool.getJsonFromEjsObject(ejsObject));
    }
  }
  public remove(ejsObject:any) {
    var idx = this.indexOf(ejsObject);
    if (idx > -1) {
      this.ejsObjects.splice(idx, 1);
      this.jsonObjects.splice(idx, 1);
    }
  }


  

}
