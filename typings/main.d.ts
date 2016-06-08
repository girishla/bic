/// <reference path="./main/ambient/angular-animate/index.d.ts" />
/// <reference path="./main/ambient/angular-cookies/index.d.ts" />
/// <reference path="./main/ambient/angular-material/index.d.ts" />
/// <reference path="./main/ambient/angular-mocks/index.d.ts" />
/// <reference path="./main/ambient/angular-resource/index.d.ts" />
/// <reference path="./main/ambient/angular-sanitize/index.d.ts" />
/// <reference path="./main/ambient/angular-ui-router/index.d.ts" />
/// <reference path="./main/ambient/angular/index.d.ts" />
/// <reference path="./main/ambient/jasmine/index.d.ts" />
/// <reference path="./main/ambient/jquery/index.d.ts" />
/// <reference path="./main/ambient/karma-jasmine/index.d.ts" />
/// <reference path="./main/ambient/moment-node/index.d.ts" />
/// <reference path="./main/ambient/moment/index.d.ts" />
/// <reference path="./main/ambient/lodash/index.d.ts" />



declare var require:{
  <T>(path:string):T;
  (paths:string[], callback:(...modules:any[]) => void):void;
  ensure:(paths:string[], callback:(require:<T>(path:string) => T) => void) => void;
};




























