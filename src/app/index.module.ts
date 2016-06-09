/// <reference path="../../typings/main.d.ts" />
/// <reference path="../../typings/elastic.d.ts" />


import "./filters/filters";
import "./controllers/controllers";
import "./directives/directives";
import "./services/services"
import "./uicore/uicore.module"
import "./dashboards/dashboards.module"
import "./permission/permission.module"
import configChartsJS from "./config/config.chartjs";
import runBlock from './index.run';
import configLayout from "./config/config.uicore.layout";
import translateConfig from "./config/config.uicore.settings";
import configLog from "./config/config.log";
import themesConfig from "./config/config.uicore.themes";
import {googleChartApiConfig} from "./config/value.googlechart";
import ErrorPageController from "./error-page.controller";
import routeConfigApp from "./config/config.route";
import AppFooterController from "./layouts/footer/footer.controller";
import AppLoaderController from "./layouts/loader/loader.controller";

declare var angularDragula:any;


module elasticslice {


  // require.ensure(['./uicore/uicore.module'],()=>{

  console.log('index.module 999');

  angular.module('elasticslice', ['permission','elasticsearch', 'elasticslice.filters', 'elasticslice.controllers', 'elasticslice.services', 'elasticslice.directives', 'ui.router', 'uicore', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
      'googlechart', 'chart.js', 'linkify','camelCaseToHuman', 'ui.calendar', 'angularMoment', 'textAngular', 'md.data.table','angularUtils.directives.dirPagination', angularDragula(angular), 'ngFileUpload', 'elastucslice.pages','elasticslice.permission'])
      .value('googleChartApiConfig', googleChartApiConfig)
      // .constant('eslURL', 'http://lngoxfappc061.legal.regn.net:3000/proteus')
      .constant('eslURL', '/')
      .controller('ErrorPageController', ErrorPageController)
      .controller('AppFooterController', AppFooterController)
      .controller('AppLoaderController', AppLoaderController)
      .run(runBlock)
      .config(configChartsJS)
      .config(configLayout)
      .config(translateConfig)
      .config(configLog)
      .config(routeConfigApp)
      .config(themesConfig)
    ;


  // } )



}

