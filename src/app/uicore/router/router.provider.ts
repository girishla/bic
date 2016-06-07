/* @ngInject */
import IServiceProvider = angular.IServiceProvider;
export default    class routeProvider implements IServiceProvider {
  // Provider
  settings = {
    docTitle: '',
    separator: ''
  };

  $get = this.routeHelper;

  setTitle(title) {
    this.settings.docTitle = title;
  }

  setSeparator(separator) {
    this.settings.separator = separator;
  }

  // Service
  routeHelper() {
    return {
      title: this.settings.docTitle,
      separator: this.settings.separator
    };
  }
}



