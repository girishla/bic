export default function ChatterConfig($sceDelegateProvider,$mdThemingProvider,$uibTooltipProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://localhost:3000/**']);

    $uibTooltipProvider.setTriggers({
      'showcellpopover' : 'hidecellpopover'
    });

    $mdThemingProvider.theme('default') .primaryPalette('grey') .accentPalette('orange');
}
