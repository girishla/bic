declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};


require("../../bower_components/angular-chart.js/dist/angular-chart.css");
require("../../bower_components/font-awesome/css/font-awesome.css");






