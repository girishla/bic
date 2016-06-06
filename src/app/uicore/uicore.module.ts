import "./layouts/layouts.module";
import "./components/components.module";
import "./directives/directives.module";
import "./profiler/profiler.module";
import"./themes/themes.module"
import "./router/router.module"
import {layoutRunner, layoutProvider} from "./layouts/layouts.provider";
import runFunction from "./uicore.run";
import routeProvider from "./router/router.provider";
import runFunctionRouter from "./router/router.run";
import routeConfig from "./config.route";
import settingsProvider from "./settings.provider";
import TitleCase from "./filters/titlecase.filter";



export default angular
  .module('uicore', [
    'ngMaterial',
    'uicore.layouts', 'uicore.components', 'uicore.themes', 'uicore.directives', 'uicore.router',
    // 'uicore.profiler',
    // uncomment above to activate the speed profiler
    'ui.router'
  ])
  .run(layoutRunner)
  .provider('uicoreLayout', layoutProvider)
  .run(runFunction)
  .provider('uicoreRoute', routeProvider)
  .run(runFunctionRouter)
  .config(routeConfig)
  .provider('uicoreSettings', settingsProvider)
  .filter('titlecase',TitleCase)
  .filter("matchMedia", function($window) {
    return function matchMedia (mediaQueryString) {
      return $window.matchMedia(mediaQueryString).matches;
    }
  });


