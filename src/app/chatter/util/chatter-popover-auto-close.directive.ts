export default function PopoverContent($timeout) {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var timeoutHandle;


      scope.$watch('isOpen', function (isOpen) {
        $timeout.cancel(timeoutHandle);

        console.log('scope isOpen watch')
        if (isOpen) {
          timeoutHandle = $timeout(function () {
            scope.isOpen = false;
          }, +attrs.popoverAutoclose || 5000);
        }
      });
    }
  }
};