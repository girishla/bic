'use strict';
import profilerConfig from "./profiler.config";

export default angular
  .module('uicore.profiler', [
    'digestHud'
  ])
  .config(profilerConfig);
