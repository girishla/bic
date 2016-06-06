import * as skinsPro from "./skins.provider";
import * as themingPro from "./theming.provider";

angular
  .module('uicore.themes', [])
  .provider('uicoreTheming', themingPro.themingProvider)
  .provider('uicoreSkins', skinsPro.skinsProvider)
  .run(skinsPro.addSkinToScope)



