'use strict';
import countupto from "./countupto.directive";
import paletteBackground from "./palette-background.directive";
import samePassword from "./same-password.directive";
import themeBackground from "./theme-background.directive";

export default    angular
  .module('uicore.directives', [])
  .directive('countupto', countupto)
  .directive('paletteBackground', paletteBackground)
  .directive('uicoreSamePassword', samePassword)
  .directive('themeBackground', themeBackground)
