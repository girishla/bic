declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};





require.ensure(["../../bower_components/font-awesome/css/font-awesome.css"],()=>{



console.log('done')





});








