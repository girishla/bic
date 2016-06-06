export class SimpleSet {
  public objects:any = [];

  public indexOf(object:any) {
    return this.objects.indexOf(object);
  }

  public add(object:any) {
    var idx = this.indexOf(object);
    if (idx == -1) {
      this.objects.push(object);
    }
  }

  public remove(object:any) {
    var idx = this.indexOf(object);
    if (idx > -1) {
      this.objects.splice(idx, 1);
    }
  }
}
