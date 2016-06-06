'use strict';

        
/* @ngInject */
export default function paletteBackground(uicoreTheming) {
  // Usage:
  // ```html
  // <div palette-background="green:500">Coloured content</div>
  // ```
  //
  // Creates:
  //
  var directive = {
    link: link,
    restrict: 'A'
  };
  return directive;

  function link($scope, $element, attrs) {
    var splitColor = attrs.paletteBackground.split(':');
    var color = uicoreTheming.getPaletteColor(splitColor[0], splitColor[1]);

    if (angular.isDefined(color)) {
      $element.css({
        'background-color': uicoreTheming.rgba(color.value),
        'border-color': uicoreTheming.rgba(color.value),
        'color': uicoreTheming.rgba(color.contrast)
      });
    }
  }
}
